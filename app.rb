#!/usr/bin/env ruby

require_relative 'models/init'

get '/' do
  haml :index
end

get '/get_data' do
  data, time = Report.format(Report.all(:created_at.gt => (Time.now - (3600 * 24))))
 
  json :reports => data, :time => time
end

get '/update_data' do
  from = Time.at(params[:from].to_i)
  data, time = Report.format(Report.all(:created_at.gt => from))

  json :reports => data, :time => time
end

# TODO: dynamic scaling request for graph data.
get '/get_data_' do
  data, time = Report.format(Report.all(:created_at.gt => (Time.now - 3600)))

  json :reports => data, :time => time
end

get '/update_data_' do
  start_date = params[:start].to_i
  end_date = params[:end] ? params[:end].to_i : Time.now.to_i
  range = end_date - start_date

  reports = repository(:default).adapter.select("SELECT AVG(temperature) as temperature, AVG(humidity) as humidity, date_trunc('hour', created_at) as created_at 
                                                 FROM reports WHERE created_at > '#{Time.at(start_date)}' AND created_at < '#{Time.at(end_date)}'
                                                 GROUP BY date_trunc('hour', created_at) ORDER BY created_at;")

  data, time = Report.format(reports)

  json :reports => data, :time => time
end

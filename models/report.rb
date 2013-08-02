class Report
  include DataMapper::Resource

  property :id, Serial
  property :temperature, Float
  property :humidity, Float
  property :created_at, DateTime

  def self.format(reports)
    from = Time.now.to_i - 60
    data = { :temp => [], :hum => [] }

    reports.each do |report|
      time = report.created_at.to_time.to_i * 1000
      data[:temp].push [time, report.temperature]
      data[:hum].push [time, report.humidity]
    end

    [data, from]
  end
end

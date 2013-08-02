require 'data_mapper'

#DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, 'postgres://postgres:123qwe@localhost/pi_box')

require_relative 'report'

DataMapper.finalize
#DataMapper.auto_migrate!
DataMapper.auto_upgrade!

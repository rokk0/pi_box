require 'rubygems'
require 'sinatra'
require 'sinatra/json'
require 'multi_json'
require 'haml'
require 'pry'

require './app'

#set :run, false
#set :root, Pathname(__FILE__).dirname

run Sinatra::Application

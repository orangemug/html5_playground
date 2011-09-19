require 'rubygems'
require 'sinatra'
require 'net/http'
require 'uri'

# Setup the public dir as root dir, this then just acts as a file server.
set :public, File.dirname(__FILE__)
set :port, 9495

#
# Application specific stuff.
#

get '/' do
  return File.read('index.html')
end

puts "Hit the URL http://domain_1:9495"


require '/home/pi/projects/pi_box/tasks/gather_data.rb'

data = gather_data
public_dir = '/home/pi/projects/pi_box/public'
info = "'Temperature: #{data[:temperature]} C, Humidity: #{data[:humidity]} %'"

`fswebcam -c fswebcam.conf --info #{info} #{ARGV[0]} #{public_dir}/webcam.jpg`


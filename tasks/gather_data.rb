def gather_data
  resp = `sudo /home/pi/projects/pi_box/tasks/Adafruit_DHT 22 4`
  data = resp.scan(/Temp = (.+) \*C, Hum = (.+) %/).flatten

  temp = data.first.to_f.round(2)
  hum = data.last.to_f.round(2)

  if (1..100).member?(temp) && (1..100).member?(hum)
    { :temperature => temp, :humidity => hum }
  else
    gather_data
  end
end

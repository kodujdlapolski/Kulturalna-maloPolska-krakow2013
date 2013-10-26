namespace :tools do
    desc "Info zabytki"
    task :info => :environment do
        puts Monument.all.size
    end
    desc "Importuje zabytki"
    task :import => :environment do
        data = JSON.parse(File.read(Rails.root.join('db', 'zabytki.json')))

        data['rows'].each do |item|
            Monument.create(
                :address => item['adres'],
                :author => item['autorka'],
                :availablity => item['dostepnosc'],
                :email => item['email'],
                :phone => item['tel'],
                :photos => item['flickr'],
                :title => item['obiekt'],
                :guardian => item['opiekun'],
                :description => item['opis'],
                :url => item['www'],
                :notices => item['uwagi'],

                :lat => item['latitude_0'],
                :lng => item['longitude_0']
            )
        end
    end
end
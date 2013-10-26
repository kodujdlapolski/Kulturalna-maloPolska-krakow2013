class Monument < ActiveRecord::Base
    scope :close_to, -> (lng, lat, distance_in_meters = 2000) {
      where(%{
        ST_DWithin(
          ST_GeographyFromText(
            'SRID=4326;POINT(' || monuments.lng || ' ' || monuments.lat || ')'
          ),
          ST_GeographyFromText('SRID=4326;POINT(%f %f)'),
          %d
        )
      } % [lng, lat, distance_in_meters])
    }
end

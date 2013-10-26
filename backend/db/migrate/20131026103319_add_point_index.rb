class AddPointIndex < ActiveRecord::Migration
  def change
    execute %{
      create index index_on_monuments_location ON monuments using gist (
        ST_GeographyFromText(
          'SRID=4326;POINT(' || monuments.lng || ' ' || monuments.lat || ')'
        )
      )
    }
  end
end
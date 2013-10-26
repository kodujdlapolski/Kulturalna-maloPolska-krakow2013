class CreateMonuments < ActiveRecord::Migration
  def change
    create_table :monuments do |t|
      t.string :address
      t.string :author
      t.string :availablity
      t.string :email
      t.string :phone
      t.string :photos
      t.string :title
      t.string :guardian

      t.text :description
      t.string :url
      t.text :notices

      t.decimal :lat, :precision => 15, :scale => 10
      t.decimal :lng, :precision => 15, :scale => 10
      t.timestamps
    end
  end
end

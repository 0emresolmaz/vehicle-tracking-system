CREATE TABLE vehicles (
id SERIAL PRIMARY KEY NOT NULL, --serial auto increament
vehicle_plate VARCHAR(20) UNIQUE NOT NULL, --unique > ignore data duplication in table
current_status INT DEFAULT 0,
is_active BOOLEAN DEFAULT true
);

CREATE TABLE devices_type (
id SERIAL PRIMARY KEY NOT NULL, 
device_name VARCHAR(75) NOT NULL,
device_description VARCHAR(255),
is_active BOOLEAN DEFAULT true
);

CREATE TABLE devices (
id SERIAL PRIMARY KEY NOT NULL,
--ON DELETE CASCADE >if a row is deleted from "devices_type" table, delete related row from "devices" table.
device_type_id INT REFERENCES devices_type(id) ON DELETE CASCADE,
	
vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
device_name VARCHAR(75),
is_online BOOLEAN DEFAULT true,
is_active BOOLEAN DEFAULT true
);

CREATE TABLE log_temperature (
id SERIAL PRIMARY KEY NOT NULL,
vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
device_id INT REFERENCES devices(id) ON DELETE CASCADE,
read_data VARCHAR(50),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE log_location (
id SERIAL PRIMARY KEY NOT NULL,
vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
device_id INT REFERENCES devices(id) ON DELETE CASCADE,
latitude VARCHAR(50),
longitude VARCHAR(50),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
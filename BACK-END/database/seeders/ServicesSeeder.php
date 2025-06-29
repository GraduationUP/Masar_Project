<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesSeeder extends Seeder
{
    public function run()
    {
        $json = file_get_contents(database_path('data/mapData.json'));
        $data = json_decode($json, true);

        if (!$data) {
            throw new \Exception("Invalid or empty JSON data in mapData.json");
        }

        // معالجة aids
        if (isset($data['aids']) && is_array($data['aids'])) {
            foreach ($data['aids'] as $item) {
                Service::create([
                    'name' => $item['name'],
                    'type' => 'aid',
                    'latitude' => $item['coordinates'][0] ?? null,
                    'longitude' => $item['coordinates'][1] ?? null,
                    'status' => true,
                ]);
            }
        }

        // معالجة GasStations
        if (isset($data['GasStations']) && is_array($data['GasStations'])) {
            foreach ($data['GasStations'] as $item) {
                Service::create([
                    'name' => $item['name'],
                    'type' => 'gas_station',
                    'latitude' => $item['coordinates'][0] ?? null,
                    'longitude' => $item['coordinates'][1] ?? null,
                    'status' => true,
                ]);
            }
        }

        // معالجة markets (الإحداثيات مصفوفة من نقاط)
        if (isset($data['markets']) && is_array($data['markets'])) {
            foreach ($data['markets'] as $item) {
                foreach ($item['coordinates'] as $coord) {
                    Service::create([
                        'name' => $item['name'],
                        'type' => 'market',
                        'latitude' => $coord[0] ?? null,
                        'longitude' => $coord[1] ?? null,
                        'status' => true,
                    ]);
                }
            }
        }
    }
}

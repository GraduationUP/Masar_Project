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

        // =======================
        // Aids
        // =======================
        foreach ($data['aids'] ?? [] as $item) {
            Service::create([
                'name' => $item['name'],
                'type' => 'aid',
                'coordinates' => json_encode([$item['coordinates']]),
                'status' => true,
            ]);
        }

        // =======================
        // Gas Stations
        // =======================
        foreach ($data['GasStations'] ?? [] as $item) {
            Service::create([
                'name' => $item['name'],
                'type' => 'gas_station',
                'coordinates' => json_encode([$item['coordinates']]),
                'status' => true,
            ]);
        }

        // =======================
        // Markets
        // =======================
        foreach ($data['markets'] ?? [] as $marketGroup) {
            $groupedCoordinates = $marketGroup['coordinates'];
            Service::create([
                'name' => $marketGroup['name'],
                'type' => 'market',
                'coordinates' => json_encode($groupedCoordinates),
                'status' => true,
            ]);
        }

        // =======================
        // الخدمات الجديدة
        // =======================
        $newServices = [
            'restaurants' => [
                ['name' => 'مطعم غزة 1', 'coordinates' => [31.5, 34.45]],
                ['name' => 'مطعم غزة 2', 'coordinates' => [31.52, 34.46]],
            ],
            'car_services' => [
                ['name' => 'خدمة سيارات 1', 'coordinates' => [31.51, 34.44]],
                ['name' => 'خدمة سيارات 2', 'coordinates' => [31.53, 34.47]],
            ],
            'petrol_station' => [
                ['name' => 'خدمة للبترول 1', 'coordinates' => [31.54, 34.45]],
                ['name' => 'خدمة للبترول 2', 'coordinates' => [31.55, 34.48]],
            ],
            'internet' => [
                ['name' => 'إنترنت 1', 'coordinates' => [31.52, 34.43]],
                ['name' => 'إنترنت 2', 'coordinates' => [31.53, 34.44]],
            ],
            'delivery' => [
                ['name' => 'توصيل 1', 'coordinates' => [31.51, 34.46]],
                ['name' => 'توصيل 2', 'coordinates' => [31.54, 34.47]],
            ],
        ];

        foreach ($newServices as $type => $items) {
            foreach ($items as $item) {
                Service::create([
                    'name' => $item['name'],
                    'type' => $type,
                    'coordinates' => json_encode([$item['coordinates']]),
                    'status' => true,
                ]);
            }
        }
    }
}

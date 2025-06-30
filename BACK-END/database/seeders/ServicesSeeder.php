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

    // Aids
    foreach ($data['aids'] ?? [] as $item) {
        Service::create([
            'name' => $item['name'],
            'type' => 'aid',
            'coordinates' => json_encode([$item['coordinates']]),
            'status' => true,
        ]);
    }

    // Gas Stations
    foreach ($data['GasStations'] ?? [] as $item) {
        Service::create([
            'name' => $item['name'],
            'type' => 'gas_station',
            'coordinates' => json_encode([$item['coordinates']]),
            'status' => true,
        ]);
    }

    // Markets (نفس السوق له أكثر من نقطة)
    foreach ($data['markets'] ?? [] as $marketGroup) {
        $groupedCoordinates = $marketGroup['coordinates'];
        Service::create([
            'name' => $marketGroup['name'],
            'type' => 'market',
            'coordinates' => json_encode($groupedCoordinates),
            'status' => true,
        ]);
    }
}

}

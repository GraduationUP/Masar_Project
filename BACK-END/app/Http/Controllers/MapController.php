<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Service;
use Illuminate\Routing\Controller;

class MapController extends Controller
{

   public function getMapData()
{
    return response()->json([
        'city' => 'غزة',

        'aids' => Service::where('type', 'aid')->where('status', true)->get()->map(fn($s) => [
            'name' => $s->name,
            'coordinates' => json_decode($s->coordinates),
        ]),

        'markets' => Service::where('type', 'market')->where('status', true)->get()->map(fn($s) => [
            'name' => $s->name,
            'coordinates' => json_decode($s->coordinates),
        ]),

        'GasStations' => Service::where('type', 'gas_station')->where('status', true)->get()->map(fn($s) => [
            'name' => $s->name,
            'coordinates' => json_decode($s->coordinates),
        ]),

        'stores' => Store::where('status', 1)->get()->map(fn($store) => [
            //get store id


            'store_id'=> $store->id,
            'name' => $store->store_name,
            'coordinates' => [(float) $store->latitude, (float) $store->longitude],
        ]),
    ]);
}

}

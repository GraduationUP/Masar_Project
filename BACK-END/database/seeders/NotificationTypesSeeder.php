<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Type;

class NotificationTypesSeeder extends Seeder
{
    public function run()
    {
        $types = [
            'report',
            'notification',
            'maintenance',
            'update',
            'account_approved',
            'account_suspended',
            'promotion',
            'feedback_request',
            'policy_update',
            'general_announcement',
            'security_alert',
             'rating',
            'comment',
        ];

        foreach ($types as $type) {
            Type::firstOrCreate(['type' => $type]);
        }
    }
}

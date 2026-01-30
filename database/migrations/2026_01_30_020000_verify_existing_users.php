<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     * 
     * Verifieert alle bestaande gebruikers zodat ze niet worden uitgesloten
     * door de nieuwe email verificatie vereiste.
     */
    public function up(): void
    {
        DB::table('users')
            ->whereNull('email_verified_at')
            ->update(['email_verified_at' => now()]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // We kunnen niet veilig terugdraaien welke gebruikers wel/niet
        // geverifieerd waren, dus laten we dit leeg.
    }
};

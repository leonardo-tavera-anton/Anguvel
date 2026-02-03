<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            // Este crea un BIGINT UNSIGNED
            $table->id('id_usuario'); 
            $table->string('dni', 255)->unique();
            $table->string('nombre', 255);
            $table->string('contrasena', 255);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reporte_incidencias', function (Blueprint $table) {
            $table->increments('id_reporte_incidencia');
            
            // CAMBIO CLAVE: Usamos unsignedBigInteger para que sea igual al id() de usuarios
            $table->unsignedBigInteger('id_usuario'); 
            
            $table->string('numero_ticket', 50)->unique();
            $table->string('categoria', 100);
            $table->string('subcategoria', 100);
            $table->text('descripcion');
            $table->string('ubicacion_incidencia', 255);
            $table->string('latitud', 100);
            $table->string('longitud', 100);
            $table->date('fecha_incidencia');
            $table->time('hora_incidencia');
            $table->string('foto_adjunta', 255)->nullable();
            $table->string('estado', 50)->default('pendiente');

            // Definición de la Llave Foránea
            $table->foreign('id_usuario')
                  ->references('id_usuario')
                  ->on('usuarios')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reporte_incidencias');
    }
};
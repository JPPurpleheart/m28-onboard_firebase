<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeguimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seguimientos', function (Blueprint $table) {
            $table->id();
            $table->biginteger('id_alumno')->unsigned();
            $table->foreign('id_alumno')->references('id')->on('alumnos');
            $table->biginteger('id_documento')->unsigned();
            $table->foreign('id_documento')->references('id')->on('documentos');
            $table->tinyInteger('class_completed')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seguimientos');
    }
}

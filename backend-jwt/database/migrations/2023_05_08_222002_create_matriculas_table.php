<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatriculasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matriculas', function (Blueprint $table) {
            $table->id();
            $table->biginteger('id_alumno')->unsigned();
            $table->foreign('id_alumno')->references('id')->on('alumnos');
            $table->biginteger('id_curso')->unsigned();
            $table->foreign('id_curso')->references('id')->on('cursos');
            $table->tinyInteger('course_completed')->default(0);
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
        Schema::dropIfExists('matriculas');
    }
}

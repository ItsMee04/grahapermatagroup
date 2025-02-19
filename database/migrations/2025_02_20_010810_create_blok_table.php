<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blok', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lokasi_id');
            $table->unsignedBigInteger('tipe_id');
            $table->string('blok', 100);
            $table->integer('status');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('lokasi_id')->references('id')->on('lokasi')->onDelete('cascade');
            $table->foreign('tipe_id')->references('id')->on('tipe')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blok');
    }
};

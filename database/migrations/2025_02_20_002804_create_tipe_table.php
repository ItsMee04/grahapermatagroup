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
        Schema::create('tipe', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lokasi_id');
            $table->string('tipe', 100);
            $table->integer('status');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('lokasi_id')->references('id')->on('lokasi')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipe');
    }
};

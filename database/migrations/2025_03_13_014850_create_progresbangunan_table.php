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
        Schema::create('progresbangunan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('konsumen_id');
            $table->unsignedBigInteger('produksi_id');
            $table->date('tanggal')->nullable();
            $table->string('image_progres', 100)->nullable();
            $table->text('keterangan')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->integer('status');
            $table->timestamps();

            $table->foreign('konsumen_id')->references('id')->on('marketing')->onDelete('cascade');
            $table->foreign('produksi_id')->references('id')->on('produksi')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progresbangunan');
    }
};

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
        Schema::create('datakonsumenkeuangan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('konsumen_id');
            $table->bigInteger('hargabrosur')->nullable();
            $table->bigInteger('diskon')->nullable();
            $table->bigInteger('hargadeal')->nullable();
            $table->bigInteger('uangmuka')->nullable();
            $table->bigInteger('kpr')->nullable();
            $table->integer('status');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('konsumen_id')->references('id')->on('marketing')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datakonsumenkeuangan');
    }
};

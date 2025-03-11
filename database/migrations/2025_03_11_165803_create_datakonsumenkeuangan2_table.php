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
        Schema::create('datakonsumenkeuangan2', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('datakonsumenkeuangan_id');
            $table->date('tanggal')->nullable();
            $table->text('keterangan')->nullable();
            $table->bigInteger('biayamasuk')->nullable()->default(0);
            $table->bigInteger('biayakeluar')->nullable()->default(0);
            $table->unsignedBigInteger('user_id');
            $table->integer('status');
            $table->timestamps();

            $table->foreign('datakonsumenkeuangan_id')->references('id')->on('datakonsumenkeuangan')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datakonsumenkeuangan2');
    }
};

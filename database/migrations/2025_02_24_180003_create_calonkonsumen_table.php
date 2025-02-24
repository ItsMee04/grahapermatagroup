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
        Schema::create('calonkonsumen', function (Blueprint $table) {
            $table->id();
            $table->string('konsumen', 100);
            $table->text('alamat');
            $table->string('kontak', 100);
            $table->text('progres')->nullable();
            $table->unsignedBigInteger('lokasi_id');
            $table->unsignedBigInteger('tipe_id');
            $table->unsignedBigInteger('blok_id');
            $table->unsignedBigInteger('metodepembayaran_id');
            $table->string('image_ktp', 100)->nullable();
            $table->string('image_kk', 100)->nullable();
            $table->string('image_npwp', 100)->nullable();
            $table->string('image_slipgaji', 100)->nullable();
            $table->string('image_tambahan', 100)->nullable();
            $table->string('image_buktibooking', 100)->nullable();
            $table->string('image_sp3bank', 100)->nullable();
            $table->string('image_survey', 100)->nullable();
            $table->date('tanggalsp3')->nullable();
            $table->date('tanggalkomunikasi')->nullable();
            $table->date('tanggalbooking')->nullable();
            $table->string('sumber', 100)->nullable();
            $table->unsignedBigInteger('user_id');
            $table->integer('status');
            $table->timestamps();

            $table->foreign('lokasi_id')->references('id')->on('lokasi')->onDelete('cascade');
            $table->foreign('tipe_id')->references('id')->on('tipe')->onDelete('cascade');
            $table->foreign('blok_id')->references('id')->on('blok')->onDelete('cascade');
            $table->foreign('metodepembayaran_id')->references('id')->on('metodepembayaran')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calonkonsumen');
    }
};

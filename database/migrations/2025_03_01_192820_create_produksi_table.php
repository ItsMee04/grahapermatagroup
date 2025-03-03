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
        Schema::create('produksi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('konsumen_id');
            $table->unsignedBigInteger('lokasi_id');
            $table->unsignedBigInteger('tipe_id');
            $table->unsignedBigInteger('blok_id');
            $table->bigInteger('hargaborongan');
            $table->bigInteger('nilaiborongan');
            $table->string('keterangan', 100)->nullable();
            $table->bigInteger('tambahan')->nullable();
            $table->bigInteger('potongan')->nullable();
            $table->string('progresrumah', 100)->nullable();
            $table->date('tanggalspk')->nullable();
            $table->string('spk', 100)->nullable();
            $table->date('tanggaltermin1')->nullable();
            $table->bigInteger('nominaltermin1')->nullable();
            $table->date('tanggaltermin2')->nullable();
            $table->bigInteger('nominaltermin2')->nullable();
            $table->date('tanggaltermin3')->nullable();
            $table->bigInteger('nominaltermin3')->nullable();
            $table->date('tanggaltermin4')->nullable();
            $table->bigInteger('nominaltermin4')->nullable();
            $table->date('tanggalretensi')->nullable();
            $table->bigInteger('nominalretensi')->nullable();
            $table->bigInteger('listrik')->nullable();
            $table->bigInteger('air')->nullable();
            $table->bigInteger('sisa')->nullable();
            $table->unsignedBigInteger('subkon_id')->nullable();
            $table->string('mandor', 100)->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('statusproses', 100)->nullable();
            $table->integer('status');
            $table->timestamps();

            $table->foreign('konsumen_id')->references('id')->on('marketing')->onDelete('cascade');
            $table->foreign('lokasi_id')->references('id')->on('lokasi')->onDelete('cascade');
            $table->foreign('tipe_id')->references('id')->on('tipe')->onDelete('cascade');
            $table->foreign('blok_id')->references('id')->on('blok')->onDelete('cascade');
            $table->foreign('subkon_id')->references('id')->on('subkontraktor')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produksi');
    }
};

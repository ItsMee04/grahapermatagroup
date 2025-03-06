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
            $table->bigInteger('hargaborongan')->default(0);
            $table->bigInteger('nilaiborongan')->default(0);
            $table->string('keterangan', 100)->nullable();
            $table->bigInteger('tambahan')->nullable()->default(0);
            $table->bigInteger('potongan')->nullable()->default(0);
            $table->string('progresrumah', 100)->nullable();
            $table->date('tanggalspk')->nullable();
            $table->string('spk', 100)->nullable();
            $table->date('tanggaltermin1')->nullable();
            $table->bigInteger('nominaltermin1')->nullable()->default(0);
            $table->date('tanggaltermin2')->nullable();
            $table->bigInteger('nominaltermin2')->nullable()->default(0);
            $table->date('tanggaltermin3')->nullable();
            $table->bigInteger('nominaltermin3')->nullable()->default(0);
            $table->date('tanggaltermin4')->nullable();
            $table->bigInteger('nominaltermin4')->nullable()->default(0);
            $table->date('tanggalretensi')->nullable();
            $table->bigInteger('nominalretensi')->nullable()->default(0);
            $table->bigInteger('listrik')->nullable()->default(0);
            $table->bigInteger('air')->nullable()->default(0);
            $table->bigInteger('sisa')->nullable()->default(0);
            $table->unsignedBigInteger('subkon_id')->nullable();
            $table->string('mandor', 100)->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('statusproses', 100)->nullable();
            $table->integer('status');
            $table->timestamps();

            $table->foreign('konsumen_id')->references('id')->on('marketing')->onDelete('cascade');
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

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
        Schema::create('pajak', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('konsumen_id');
            $table->unsignedBigInteger('lokasipajak_id');
            $table->bigInteger('hargatransaksi')->nullable()->default(0);
            $table->bigInteger('nominalpph')->nullable()->default(0);
            $table->date('tanggalinputpph')->nullable();
            $table->string('image_inputpph', 100)->nullable();
            $table->date('tanggalbayarpph')->nullable();
            $table->date('tanggallaporpph')->nullable();
            $table->string('image_laporpph', 100)->nullable();
            $table->bigInteger('nominalppnkeluar')->nullable()->default(0);
            $table->date('tanggalinputppn')->nullable();
            $table->string('image_inputppn', 100)->nullable();
            $table->date('tanggalbayarppn')->nullable();
            $table->date('tanggallaporppn')->nullable();
            $table->string('image_laporppn', 100)->nullable();
            $table->bigInteger('nominalppnmasuk')->nullable()->default(0);
            $table->date('tanggalinputlaporppn')->nullable();
            $table->text('keterangan')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->integer('status');
            $table->timestamps();


            $table->foreign('konsumen_id')->references('id')->on('marketing')->onDelete('cascade');
            $table->foreign('lokasipajak_id')->references('id')->on('lokasipajak')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pajak');
    }
};

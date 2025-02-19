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
        Schema::create('pegawai', function (Blueprint $table) {
            $table->id();
            $table->string('nip', 100);
            $table->string('nama', 100);
            $table->unsignedBigInteger('jeniskelamin_id');
            $table->unsignedBigInteger('agama_id');
            $table->string('tempat', 100);
            $table->date('tanggal');
            $table->unsignedBigInteger('jabatan_id');
            $table->string('kontak', 100);
            $table->text('alamat');
            $table->string('image', 100)->nullable();
            $table->integer('status');
            $table->timestamps();

            $table->foreign('jeniskelamin_id')->references('id')->on('jeniskelamin')->onDelete('cascade');
            $table->foreign('agama_id')->references('id')->on('agama')->onDelete('cascade');
            $table->foreign('jabatan_id')->references('id')->on('jabatan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pegawai');
    }
};

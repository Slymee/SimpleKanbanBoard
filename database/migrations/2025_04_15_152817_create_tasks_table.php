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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->unique();
            $table->text('description')->nullable();
            $table->string('priority', 10)->nullable();
            $table->string('status', 20);
            // $table->foreignId('created_by')->constrained('users')->onUpdate('restrict');
            // $table->foreignId('updated_by')->constrained('users')->onUpdate('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

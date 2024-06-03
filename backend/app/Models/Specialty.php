<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    use HasFactory;
    protected $fillable = ['specialty_name', 'specialty_description'];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
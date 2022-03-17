<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pena extends Model
{
    protected $fillable = [
        'project_id',
        'type',
        'procent_zi',
        'asupra',
        'dela',
        'pana_la',
        'zile',
        'suma',
        'type_pena',
        'penalitati_simple',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}

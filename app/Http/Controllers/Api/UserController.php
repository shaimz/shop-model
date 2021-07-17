<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Api\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {

    }

    public function show($id)
    {
        $user = User::find($id);
        return $user->permission_id === 3;

    }

    public function create()
    {

    }

    public function store(Request $request)
    {

    }

    public function checkUser(Request $request)
    {
        $email = $request->email;
        $user = User::where('email', '=', $email)->first();

        return response()->json($user ? ['error' => 'Email is taken!'] : '');
    }

    public function getUser(Request $request)
    {
        $user_id = $request->id;

        $user = User::find($user_id);

        $data = [
            'id' => $user_id,
            'email' => isset($user->email) ? $user->email : '',
            'phone' => isset($user->phone) ? $user->phone : '',
            'name' => isset($user->name) ? $user->name : ''
        ];
        return response()->json($data);
    }
}

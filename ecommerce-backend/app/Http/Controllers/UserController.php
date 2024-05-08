<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function login(Request $req)
    {
        $user= User::where(['email'=>$req->email])->first();
        // print_r($user);
        if ($user && Hash::check($req->password, $user->password)) 
        {
            // $req->session()->put('user', $user);
            return response()->json($user);
        }
        else{
            return response([
                'error'=>['Email or password not match']
            ]);
        }
    }
    function register(Request $req)
    {
        $validated = $req->validate([
            'name' => 'required|string|max:20',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|alpha_num|min:6',
            'confirm_password'  => 'required|same:password',
        ], 
        [
          'confirm_password.same' => 'Confirm password not match.',
        ]
    );
        $user= new User;
        $user->name=$req->name;
        $user->email=$req->email;
        $user->password=Hash::make($req->password);
        $user->save();
        // print_r($user);
        // return redirect('/user_login')->with('status', 'Registration successful! Please login.');
        return $user;
    }
}

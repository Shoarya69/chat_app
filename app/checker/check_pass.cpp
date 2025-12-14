#include <pybind11/pybind11.h>
#include<string>
namespace py = pybind11;
using std::string;


struct Result {
    bool lower, upper, digit, special;
    
};

struct The_retur
{
    string a;
    bool ok;
};

The_retur check(const string &s ){
         Result r{false, false, false, false};
        int siz = s.size(); 
        if (siz < 6) return {"for creating Password Min. Length Must be 6 Charater",false};
        for (unsigned char c : s) {
            if (c >= 'a' && c <= 'z') r.lower = true;
            else if (c >= 'A' && c <= 'Z') r.upper = true;
            else if (c >= '0' && c <= '9') r.digit = true;
            else r.special = true;

            // early exit
            if (r.lower && r.upper && r.digit && r.special)
                break;
    }
    if(!r.digit){
        return {"There must be atleast 1 Digit in Password",false};
    }
    else if(!r.lower){
        return {"There must be atleast 1 lowerCase in Password",false};
    }
    else if(!r.special){
        return {"There must be atleast 1 Special Charater in Password",false};
    }
    else if(!r.upper){
        return {"There must be atleast 1 UpperCase in Password",false};
    }
    else{
        return {"alright password",true};
    }
}

PYBIND11_MODULE(password_check, m) {

    py::class_<The_retur>(m, "Result")
        .def_readonly("a", &The_retur::a)
        .def_readonly("ok", &The_retur::ok);

    m.def("check", &check, "Fast password validation");
}

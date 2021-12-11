#include <bits/stdc++.h>
using namespace std;

#define cin(vec) for(auto& i : vec) cin >> i
#define cin_2d(vec, n, m) for(int i = 0; i < n; i++) for(int j = 0; j < m && cin >> vec[i][j]; j++);
#define cout(vec) for(auto& i : vec) cout << i << " "; cout << "\n";
#define cout_2d(vec, n, m) for(int i = 0; i < n; i++, cout << "\n") for(int j = 0; j < m && cout << vec[i][j] << " "; j++);
#define cout_map(mp) for(auto& [f, s] : mp) cout << f << "  " << s << "\n";
#define Time cerr << "Time Taken: " << (float)clock() / CLOCKS_PER_SEC << " Secs" << "\n";
#define fixed(n) fixed << setprecision(n)
#define ceil(n, m) (((n) / (m)) + ((n) % (m) ? 1 : 0))
#define fill(vec, value) memset(vec, value, sizeof(vec));
#define Num_of_Digits(n) ((int)log10(n)+1)
#define mod_combine(a, b, m) (((a % m) * (b % m)) % m)
#define all(vec) vec.begin(),vec.end()
#define rall(vec) vec.rbegin(),vec.rend()
#define sz(x) int(x.size())
#define fi first
#define se second
#define Pair pair < int, int >
#define ll long long
#define ull unsigned long long
#define Mod  1'000'000'007
#define OO 2'000'000'000
#define EPS 1e-9
#define PI acos(-1)

void AhMeD_HoSSaM(){
  ios_base::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);
  #ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin), freopen("output.txt", "w", stdout);
  #endif
}

struct Big_Int {

    Big_Int(){}

    string Add (string s1,string s2) {
        string res;
        reverse(all(s1)), reverse(all(s2));
        int temp = 0,carry = 0, i;
        for (i = 0; i < sz(s1); i++) {
            if ((i + 1) > sz(s2)) s2[i] = '0';
            temp = s1[i] - '0' + s2[i] - '0' + carry;
            res[i] = temp % 10 + '0';
            carry = temp / 10;
        }
        while (carry != 0) {
            res[i++] = carry % 10 + '0';
            carry = carry / 10;
        }
        return res;
    }

    string Multiply(string A, string B) {    
        vector < int > arr(sz(A) + sz(B), 0);    
        for(int i = sz(A) - 1;i >= 0; i--){        
            for(int j = sz(B) - 1; j >= 0; j--){            
            int x = (B[j] - '0') * (A[i] - '0') + arr[i + j + 1];           
            arr[i + j + 1] = x % 10;            
            arr[i + j] += x / 10;        
            }
        }    
        int i = 0;    
        while(i < sz(arr)){        
            if(arr[i] != 0) break;            
            i++;
        }                
        if(i == sz(arr)) return "0";                
        string s = "";
        for(int j = i; j < sz(arr); j++)        
            s += to_string(arr[j]);            
        return s;    
    }

    bool isSmaller(string str1, string str2){
        int n1 = sz(str1), n2 = sz(str2);
        if (n1 < n2) return true;
        if (n2 < n1) return false;
        for (int i = 0; i < n1; i++)
            if (str1[i] < str2[i]) return true;
            else if (str1[i] > str2[i]) return false;
        return false;
    }

    string findDiff(string str1, string str2){
        if (isSmaller(str1, str2)) swap(str1, str2);
        string str = "";
        int n1 = sz(str1), n2 = sz(str2);
        reverse(all(str1)), reverse(all(str2));
        int carry = 0;
        for (int i = 0; i < n2; i++) {
            int sub = ((str1[i] - '0') - (str2[i] - '0') - carry);
            if (sub < 0) sub = sub + 10, carry = 1;
            else carry = 0;
            str.push_back(sub + '0');
        }
        for (int i = n2; i < n1; i++) {
            int sub = ((str1[i] - '0') - carry);
            if (sub < 0) sub = sub + 10, carry = 1;
            else carry = 0;
            str.push_back(sub + '0');
        }
        reverse(str.begin(), str.end()); 
        return str;
    }

    string longDivision(string number, int divisor){
        string ans;
        int idx = 0;
        int temp = number[idx] - '0';
        while (temp < divisor)
            temp = temp * 10 + (number[++idx] - '0');
        while (sz(number) > idx) {
            ans += (temp / divisor) + '0';
            temp = (temp % divisor) * 10 + number[++idx] - '0';
        }
        if (ans.length() == 0) return "0";
        return ans;
    }

    ll Big_Mod(string s, ll mod){
        ll res = 0;
        for(auto& c : s)
            res = (res * 10 + (c - '0')) % mod;
        return res;
    }

};

void solve(){
    
}

int main(){
    AhMeD_HoSSaM();
    int t = 1;
    //cin >> t;
    while(t--)
        solve();
    Time
    return 0;
} 
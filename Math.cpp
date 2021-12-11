#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace std;
using namespace __gnu_pbds;

#define ordered_set tree<ll, null_type,less<ll>, rb_tree_tag,tree_order_statistics_node_update> 
#define cin(vec) for(auto& i : vec) cin >> i
#define cin_2d(vec, n, m) for(int i = 0; i < n; i++) for(int j = 0; j < m && cin >> vec[i][j]; j++);
#define cout(vec) for(auto& i : vec) cout << i << " "; cout << "\n";
#define cout_2d(vec, n, m) for(int i = 0; i < n; i++, cout << "\n") for(int j = 0; j < m && cout << vec[i][j] << " "; j++);
#define cout_map(mp) for(auto& [f, s] : mp) cout << f << "  " << s << "\n";
#define Time cerr << "Time Taken: " << (float)clock() / CLOCKS_PER_SEC << " Secs" << "\n";
#define fixed(n) fixed << setprecision(n)
#define ceil(n, m) (((n) / (m)) + ((n) % (m) ? 1 : 0))
#define fill(vec, value) memset(vec, value, sizeof(vec));
#define Num_of_Digits(n) ((int)log10(n) + 1)
#define mod_combine(a, b, m) (((a % m) * (b % m)) % m)
#define all(vec) vec.begin(), vec.end()
#define rall(vec) vec.rbegin(), vec.rend()
#define sz(x) int(x.size())
#define debug(x) cout << #x << ": " << (x) << "\n";
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

ll GCD(ll a, ll b){
    return (!b ? a : GCD(b, a % b));
}
  
ll LCM(ll a, ll b){
    return a / GCD(a, b) * b;
}

vector < int > prime_factorization(ll n){
    vector < int > factors;
    while(n % 2 == 0) factors.push_back(2), n /= 2;
    for(int i = 3; i <= sqrt(n); i += 2)
        while(n % i == 0) factors.push_back(i), n /= i;
    if(n > 2) factors.push_back(n);
    return factors;
}

ll nCr(ll n, ll r){
  ll p = 1, k = 1;
  if (n - r < r) r = n - r;
  // condition for minimum choose
  if(n < 1) return 0;
  while (r){
    p *= n, k *= r;
    ll m = __gcd(p, k);
    p /= m, k /= m, n--, r--;        
  }
  return p;
}

ll nPr(ll n, ll r){
    vector < ll > factroial(n + 1, 1);
    for(int i = 1; i <= n; i++) factroial[i] = factroial[i - 1] * i;
    return factroial[n] / factroial[n - r];
}

ll Big_Mod(string s, ll mod){
    ll res = 0;
    for(auto& c : s)
        res = (res * 10 + (c - '0')) % mod;
    return res;
}

ll fast_pow(ll b, ll e){
    ll power = 1;
    while(e){
        if(e & 1) power *= b;
        e >>= 1;
        b *= b;
    }
    return power;
}

ll fast_pow(ll b, ll e, ll mod){
    ll power = 1;
    while(e){
        if(e & 1) power = ((power % mod) * (b % mod)) % mod;
        e >>= 1;
        b = ((b % mod) * (b % mod)) % mod;
    }
    return power % mod;
}

bool is_prime(ll n){
    if(n < 2 || (n % 2 == 0 && n != 2)) return false;
    for(int i = 3; i <= sqrt(n); i += 2)
        if(n % i == 0) return false;
    return true;
}

int number_of_devisors(ll n){
    int divisors = 0;
    for(int i = 1; i < sqrt(n); i++)
        if(n % i == 0) divisors += 2;
    return divisors + (sqrt(n) == (int)sqrt(n));
}

vector < ll > Get_Divisors(ll n){
    vector < ll > divisors;
    for(int i = 1; i < sqrt(n); i++)
        if(n % i == 0) divisors.push_back(i), divisors.push_back(n / i);
    if(sqrt(n) == int(sqrt(n))) divisors.push_back(sqrt(n));
    return divisors;
}

void Print_Permutation(vector < int >& nums){
    sort(all(nums));
    do {
        for(auto& i : nums)
            cout << i << " ";
        cout << "\n";
    } while(next_permutation(nums.begin(), nums.end()));
}

ll Summation(ll x){
    return x * (x + 1) / 2;
}

ll how_many_divisors(ll a, ll b, ll c){
    return (b / c - a / c) + !(a % c);
}

ll Summation_of_Devisors(ll a, ll b, ll c){
    ll right = Summation(b / c);
    ll left = Summation(a % c == 0 ? (a - 1) / c : a / c);
    return (right * c) - (left * c);
}

void solve(){
    
}

int main(){
    AhMeD_HoSSaM();
    int t = 1;
    cin >> t;
    while(t--)
        solve();
    Time
    return 0;
} 
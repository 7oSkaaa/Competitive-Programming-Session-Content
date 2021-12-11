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

struct Partial_2D {

    vector < vector < ll > > partial;
    int n, m;

    Partial_2D(int n, int m){
        this -> n = n, this -> m = m;
        partial.assign(n + 5, vector < ll > (m + 5));
    }

    void build_partial(int queries){
        while(queries--){
            Pair p1, p2;
            cin >> p1.fi >> p1.se >> p2.fi >> p2.se;
            if(p1.fi > p2.fi) swap(p1.fi, p2.fi);
            if(p1.se > p2.se) swap(p1.se, p2.se);
            partial[p2.fi][p2.se]++, partial[p2.fi][p1.se - 1]--, partial[p1.fi - 1][p2.se]--, partial[p1.fi - 1][p1.se - 1]++;
        }
        for(int i = n; i >= 0; i--)
        for(int j = m; j >= 0; j--)
            partial[i][j] += partial[i][j + 1];
        for(int i = n; i >= 0; i--)
        for(int j = m; j >= 0; j--)
            partial[i][j] += partial[i + 1][j];
    }

    ll get(int x, int y){
        return partial[x][y];
    }

    void print(){
        for(int i = 1; i <= n; i++, cout << "\n")
            for(int j = 1; j <= n && cout << partial[i][j] << " "; j++);
    }

};

struct Prefix_2D {

    int n, m;
    vector < vector < ll > > prefix;
    
    Prefix_2D(int n, int m){
        this -> n = n, this -> m = m;
        prefix.assign(n + 5, vector < ll > (m + 5));
    }

    ll get_query(int i, int j, int k, int l){
        return prefix[k][l] - prefix[i - 1][l] - prefix[k][j - 1] + prefix[i - 1][j - 1];
    }

    void build_prefix(){
        for(int i = 1; i < n; i++)
            for(int j = 1; j < m; j++)
                prefix[i][j] += prefix[i][j - 1];
        for(int j = 1; j < m; j++)
            for(int i = 1; i < n; i++)
                prefix[i][j] += prefix[i - 1][j];
    }
};


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
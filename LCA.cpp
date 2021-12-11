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

struct LCA {

    vector < int > dep;
    vector < vector < Pair > > adj; 
    vector < vector < int > > anc, cost;

    LCA(int n){
        dep.resize(n);
        adj.resize(n);
        anc.assign(n, vector < int > (20));
        cost.assign(n, vector < int > (20));
    }

    int k_ancestor(int node, int dist){
        if(dep[node] <= dist) return -1;
        for(int bit = 0; bit < 20; bit++)
            if(dist & (1 << bit))
                node = anc[node][bit];
        return node;
    }

    int combine(int u, int v){
        return min(u, v);
    }

    void dfs(int node, int par, int c){
        dep[node] = dep[par] + 1, anc[node][0] = par, cost[node][0] = c;
        for(int bit = 1; bit < 20; bit++){
            anc[node][bit] = anc[anc[node][bit - 1]][bit - 1];
            cost[node][bit] = min(cost[node][bit - 1], cost[anc[node][bit - 1]][bit - 1]);
        }
        for(auto& [new_node, value] : adj[node])
        if(new_node != par)
            dfs(new_node, node, value);
    }

    int lca(int u, int v){
        if(dep[u] > dep[v])
        swap(u, v);
        v = k_ancestor(v, dep[v] - dep[u]);
        if(u == v) return u;
        for(int bit = 19; bit >= 0; bit--)
        if(anc[u][bit] != anc[v][bit])
            u = anc[u][bit], v = anc[v][bit];
        return anc[u][0];
    }

    int get_cost(int node, int dist){
        if(dep[node] <= dist) return -1;
        int ans = OO;
        for(int bit = 0; bit < 20; bit++)
            if(dist & (1 << bit))
                ans = combine(ans, cost[node][bit]), node = anc[node][bit];
        return ans;
    }

    int query(int u, int v){
        if(dep[u] > dep[v])
        swap(u, v);
        int LCA = lca(u, v);
        return combine(get_cost(u, dep[u] - dep[LCA]), get_cost(v, dep[v] - dep[LCA]));
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
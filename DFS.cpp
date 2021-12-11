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

struct Graph {
    
    vector < vector < int > > adj;
    vector < bool > vis;
    vector < int > depth, parent;
    
    Graph(int n, int m){
        adj.resize(n); 
        vis.resize(n); 
        depth.resize(n); 
        parent.resize(n);
    }

    void add_edge(int u, int v){
        adj[u].push_back(v), adj[v].push_back(u);
    }

    void remove_edge(int u, int v){
        adj[u].erase(find(all(adj[u]), v)), adj[v].erase(find(all(adj[v]), u));
    }

    void dfs(int node, int dep = 0, int par = 0){
        vis[node] = true, parent[node] = par, depth[node] = dep;
        for(auto& new_node : adj[node])
            if(!vis[new_node])
                dfs(new_node, dep + 1, node);
    }

    bool is_cycle(int node, int par){
        vis[node] = true;
        for(auto& new_node : adj[node]){
            if(!vis[new_node]){
                if(is_cycle(new_node, node))
                    return true;
            }
            else if(new_node != par)
                return true;
        }
        return false;
    }

    void get_path(int node){
        if(parent[node] == node) return;
        cout << node << " ";
        get_path(parent[node]);
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
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

struct Dijkstra {
    
    struct Edge {
        int to, from, w;
        Edge(int from, int to, int w): from(from), to(to), w(w) {}
        bool operator < (const Edge& e) const {
            return w > e.w;
        }
    };

    vector < vector < Edge > > adj;

    Dijkstra(int edges){
        adj.resize(edges);
    }

    int Min_Cost(int search, int dest = -1){
        int n = sz(adj);
        vector < int > dist(n, OO), prev(n, -1);
        dist[search] = 0;
        priority_queue < Edge > Dij;
        Dij.push(Edge(-1, 0, 0));
        while(!Dij.empty()){
            Edge e = Dij.top();
            Dij.pop();
            if(e.w > dist[e.to]) continue;
            prev[e.to] = e.from;
            for(auto& edge: adj[e.to]){
                if(dist[edge.to] > dist[edge.from] + edge.w){
                    edge.w = dist[edge.to] = dist[edge.from] + edge.w;
                    Dij.push(edge);
                }
            }
        }
        return (dest == -1 ? -1 : dist[dest]);
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
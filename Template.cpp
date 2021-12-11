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
#define EPS 1e-4
#define PI acos(-1)

void AhMeD_HoSSaM(){
    ios_base::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);
    #ifndef ONLINE_JUDGE
        freopen("input.txt", "r", stdin), freopen("output.txt", "w", stdout);
    #endif
}

// -------------------------- Trie -----------------------------
 
struct Trie {
    
    struct Node {
        Node* child[26];
        bool is_word;
        Node(){
        fill(child, 0);
        is_word = false;
        }
    };

    Node* root;
    
    Trie(){
      root = new Node;
    }
    
    void insert(string word){
      Node* curr = root; 
      for(auto& c : word){
        if(!curr -> child[c - '0']) curr -> child[c - '0'] = new Node;
        curr = curr -> child[c - '0'];
      }
      curr -> is_word = true;
    }
  
    bool search(string word){
      Node* curr = root; 
      for(auto& c : word){
        if(!curr -> child[c - '0']) return false;
        curr = curr -> child[c - '0'];
      }
      return curr -> is_word;
    }
 
};

// -------------------------- Seive -----------------------------

struct Seive {

    vector < bool > is_prime;
    vector < ll > primes;

    Seive(int n){
        is_prime.assign(n + 1, true);
        is_prime[0] = is_prime[1] = false;
        for(ll i = 2; i <= sqrt(n); i++)
            if(is_prime[i])
                for(ll j = i * i; j <= n; j += i) is_prime[j] = false;
    }

    void get_primes(int n){
        for(int i = 1; i <= n; i++)
            if(is_prime[i])
                primes.push_back(i);
    }

    void print_primes(){
        for(auto& p : primes)
            cout << p << " ";
        cout << "\n";
    }

};

// -------------------------- Segment Tree -----------------------------

struct Segment_Tree {

    int size;
    vector < ll > tree; 
    
    void intial(int n){
        size = 1;
        while(size <= n) size *= 2;
        tree.assign(2 * size, 0ll);
    }

    Segment_Tree(int n){
        intial(n);
    }

    ll operation(ll a, ll b){
        return a + b;
    }

    // The vector must be 1-based and same thing for the tree
    void build(vector < int >& nums, int idx, int lx, int rx){
        if(lx >= sz(nums)) return;
        if(rx == lx) tree[idx] = nums[lx];
        else {
            int m = (rx + lx) / 2;
            build(nums, 2 * idx, lx, m);
            build(nums, 2 * idx + 1, m + 1, rx);
            tree[idx] = operation(tree[2 * idx], tree[2 * idx + 1]);
        }
    }

    void build(vector < int >& nums){
        build(nums, 1, 1, size);
    }

    void update(int i, int v, int idx, int lx, int rx){
        if(rx == lx) tree[idx] = v;
        else {  
            int m = (rx + lx) / 2;
            if(i <= m) update(i, v, 2 * idx, lx, m);
            else update(i, v, 2 * idx + 1, m + 1, rx);
            tree[idx] = operation(tree[2 * idx], tree[2 * idx + 1]);
        }
    }

    void update(int i, int v){
        update(i, v, 1, 1, size);
    }

    ll query(int l, int r, int idx, int lx, int rx){
        if(lx > r || l > rx) return 0;
        if(lx >= l && rx <= r) return tree[idx];
        int m = (lx + rx) / 2;
        return operation(query(l, r, 2 * idx, lx, m), query(l, r, 2 * idx + 1, m + 1, rx));
    }

    ll query(int l, int r){
        return query(l, r, 1, 1, size);
    }
};

// -------------------------- Lazy Propagation -----------------------------

struct Lazy_Propagation {

    int size;
    vector < ll > operations; 
    
    void intial(int n){
        size = 1;
        while(size <= n) size *= 2;
        operations.assign(2 * size, 0ll);
    }

    Lazy_Propagation(int n){
        intial(n);
    }

    ll operation(ll a, ll b){
        return max(a, b);
    }

    void build(vector < int >& nums, int idx, int lx, int rx){
        if(lx >= sz(nums)) return;
        if(rx == lx) operations[idx] = nums[lx];
        else {
            int m = (rx + lx) / 2;
            build(nums, 2 * idx, lx, m);
            build(nums, 2 * idx + 1, m + 1, rx);
            operations[idx] = operation(operations[2 * idx], operations[2 * idx + 1]);
        }
    }

    // the vector should be 1-based also the tree is 1-based
    void build(vector < int >& nums){
        build(nums, 1, 1, size);
    }

    void update(int l, int r, int v, int idx, int lx, int rx){
        if(lx > r || l > rx) return;
        if(lx >= l && rx <= r){
            operations[idx] = operation(operations[idx], v);
            return;
        }
        int m = (lx + rx) / 2;
        update(l, r, v, 2 * idx, lx, m), update(l, r, v, 2 * idx + 1, m + 1, rx);
    }

    void update(int l, int r, int v){
        update(l, r, v, 1, 1, size);
    }

    ll query(int i, int idx, int lx, int rx){
        if(rx == lx) return operations[idx];
        else {  
            int m = (rx + lx) / 2;
            if(i <= m) return operation(operations[idx], query(i, 2 * idx, lx, m));
            else return operation(operations[idx], query(i, 2 * idx + 1, m + 1, rx));
        }
    }

    ll query(int i){
        return query(i, 1, 1, size);
    }

};

// -------------------------- Prefix Sum 2D -----------------------------

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

// -------------------------- Partial Sum 2D -----------------------------

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

// -------------------------- nCr power inverse -----------------------------

struct Power_Inverse {
    
    ll n, r, mod;
    vector < ll > fact, inv;

    ll fast_power(ll b, ll e, ll mod){
        ll power = 1;
        while(e){
            if(e & 1) power = mod_combine(power, b, mod);
            e >>= 1, b = mod_combine(b, b, mod);
        }
        return power % mod;
    }

    Power_Inverse(ll n, ll r, ll mod){
        this -> n = n, this -> r, this -> mod = mod;
        fact.assign(n + 10, 1), inv.resize(n + 10);
        for(ll i = 1; i <= n; i++){
            fact[i] = mod_combine(fact[i - 1], i, mod);
            inv[i] = fast_power(fact[i], mod - 2, mod);
        }
    }

    ll nCr(){
        if(r > n) return 0;
        return (((fact[n] % mod * inv[r] % mod) % mod) * (inv[n - r] % mod)) % mod;
    }

    ll nPr(){
        if(r > n) return 0;
        return (fact[n] % mod * inv[r] % mod) % mod;
    }

};

// -------------------------- Math Functions -----------------------------

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
        e >>= 1, b *= b;
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

bool is_Prime(ll n){
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

// -------------------------- LCA -----------------------------

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

// -------------------------- Graph -----------------------------

struct Graph {

    int n, m;
    vector < vector < int > > adj;
    vector < bool > vis;
    vector < int > depth, parent, deg;
    
    Graph(int n, int m){
        this -> n = n, this -> m = m;
        adj.resize(n + 10); 
        vis.resize(n + 10); 
        depth.resize(n + 10); 
        parent.resize(n + 10);
        deg.resize(n + 10);
    }

    void add_edge(int u, int v){
        adj[u].push_back(v), adj[v].push_back(u);
        deg[u]++, deg[v]++;
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

    void topology (){
        queue < int > topo;
        vector < int > graph;
        for(int i = 1; i <= n; i++)
            if(deg[i] == 1) topo.push(i), deg[i]--;
        while(!topo.empty()){
            int curr_node = topo.front();
            topo.pop();
            graph.push_back(curr_node);
            for(auto& new_node : adj[curr_node]){
                deg[new_node]--;
                if(deg[new_node] == 1)
                    topo.push(new_node);
            }
        }
        reverse(all(graph));
        cout(graph);
    }

    int bfs(int from, int to){
        if(from == to) return 0;
        queue < int > BFS;
        depth.assign(n + 10, OO);
        vis[from] = true, depth[from] = 0;
        BFS.push(from);
        while(!BFS.empty()){
            int sz = sz(BFS);
            while(sz--){
                int curr_node = BFS.front();
                BFS.pop();
                for(auto& new_node : adj[curr_node]){
                    if(!vis[new_node])
                        BFS.push(new_node), parent[new_node] = curr_node, depth[new_node] = min(depth[new_node], depth[curr_node] + 1);
                }
            }
        }
        return depth[to];
    }

};

// -------------------------- KMP -----------------------------

struct KMP {

    vector < int > Compute_Prefix(string pat){
        vector < int > longest_prefix(sz(pat));
        for(int i = 0, k; i < sz(pat); i++){
            while(k > 0 && pat[k] != pat[i])
                k = longest_prefix[k - 1];
            if(pat[k] == pat[i]) k++;
            else k = longest_prefix[k - 1];
        }
        return longest_prefix;
    }

    KMP(string str, string pat){
        vector < int > longest_prefix = Compute_Prefix(pat);
        for(int i = 0, k; i < sz(str); i++){
            while(k > 0 && pat[k] != str[i])
                k = longest_prefix[k - 1];
            if(pat[k] == str[i]) k++;
            if(k == sz(pat))
                k = longest_prefix[k - 1];
        }
    }
};

// -------------------------- Fenwick Tree -----------------------------

struct Fenwick_Tree {
    
    vector < ll > Tree;
    int n;

    Fenwick_Tree(int n){
        this -> n = n + 1;
        Tree.assign(n + 1, 0);
    }

    int lowest_bit(int idx){
        return (idx & -idx);
    }

    void build(vector < ll >& nums){
        for(int i = 0; i < sz(nums); i++)
            add(i, nums[i]);
    }

    void add(int idx, int val){
        idx++;
        while(idx <= n){
            Tree[idx] += val;
            idx += lowest_bit(idx);
        }
    }

    ll get_sum(int idx){
        ll sum = 0;
        idx++;
        while(idx){
            sum += Tree[idx];
            idx -= lowest_bit(idx);
        }
        return sum;
    }

    ll query(int l, int r){
        return get_sum(r) - get_sum(l - 1);
    }

};

// -------------------------- Fenwick Tree -----------------------------

struct Fenwick_Tree_2D {
    
    vector < vector < ll > > Tree;
    int n, m;

    Fenwick_Tree_2D(int n, int m){
        this -> n = n + 1, this -> m = m + 1;
        Tree.assign(n + 1, vector < ll > (m + 1, 0));
    }

    int lowest_bit(int idx){
        return (idx & -idx);
    }

    void build(vector < vector < ll > >& nums){
        for(int i = 0; i < sz(nums); i++)
            for(int j = 0; j < sz(nums[0]); j++)
                add(i, j, nums[i][j]);
    }

    void add(int idx, int jdx, int val){
        int i = idx + 1, j = jdx + 1;
        while(i <= n){
            j = jdx + 1;
            while(j <= m){
                Tree[i][j] += val;
                j += lowest_bit(j);    
            }
            i += lowest_bit(i);
        }
    }

    ll get_sum(int idx, int jdx){
        ll sum = 0;
        int i = idx + 1, j = jdx + 1;
        while(i){
            j = jdx + 1;
            while(j){
                sum += Tree[i][j];
                j -= lowest_bit(j);    
            }
            i -= lowest_bit(i);
        }
        return sum;
    }

    ll query(int x1, int y1, int x2, int y2) {
        return get_sum(x2, y2) - get_sum(x1 - 1, y2) - get_sum(x2, y1 - 1) + get_sum(x1 - 1, y1 - 1);
    }

};

// -------------------------- Seive Factorization -----------------------------

struct Factorization {
    
    int n;
    vector < int > factors;
    vector < int > prime_factors;

    Factorization(int n){
        this -> n = n;
        factors.assign(n + 10, 2);
        prime_factors.resize(n + 10);
    }

    void factorization(int n){ 
        for (ll i = 2; i <= n; i++) {  
            for (ll j = i * 2; j <= n; j += i) factors[j]++;
        }
    }

    ll get_factors(ll n){
        return factors[n];
    }

    void prime_factorization(int n){
        for (ll i = 2; i <= 1e6; i++){ 
            if (!prime_factors[i]) { 
                for (ll j = 2 * i; j <= 1e6; j += i) prime_factors[j]++;
                prime_factors[i] = 1; 
            }
        }
    }

    ll get_prime_factors(ll n){
        return prime_factors[n];
    }
};

// -------------------------- Disjoint Set Union -----------------------------

struct DSU {
    
    vector < int > parent, Gsize;

    DSU(int MaxNodes){
        parent.resize(MaxNodes + 5);
        Gsize.resize(MaxNodes + 5);
        for(int i = 1; i <= MaxNodes; i++)
          parent[i] = i, Gsize[i] = 1;
    }
    
    int find_leader(int node){
        return parent[node] = (parent[node] == node ? node : find_leader(parent[node]));
    }

    bool same_set(int u, int v){
        return find_leader(u) == find_leader(v);
    }

    void union_sets(int u, int v){
        int leader_u = find_leader(u), leader_v = find_leader(v);
        if(leader_u ==leader_v) return;
        if(Gsize[leader_u] <= Gsize[leader_v]) swap(leader_u, leader_v);
        Gsize[leader_u] += Gsize[leader_v], parent[leader_v] = leader_u;
    }

    int get_size(int node){
        return Gsize[find_leader(node)];
    }
};


// -------------------------- Dijkstra -----------------------------

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

// -------------------------- Big Integer -----------------------------

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

// -------------------------- Ordered Set -----------------------------

#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;

#define ordered_set tree < ll, null_type, less < ll >, rb_tree_tag,tree_order_statistics_node_update >

// -------------------------- Optimizations -----------------------------

#pragma GCC optimize("Ofast")
#pragma GCC target("avx,avx2,fma")
#pragma GCC optimization ("unroll-loops")

// -------------------------- Directions -----------------------------
 
vector < Pair > dir_4 = {{0, 1}, {0, -1}, {-1, 0}, {1, 0}};
vector < Pair > dir_8 = {{0, 1}, {0, -1}, {-1, 0}, {1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};

// -------------------------- Knight moves -----------------------------

vector < Pair > k_mov = {{2, 1}, {1, 2}, {-1, 2}, {-2, 1}, {-2, -1}, {-1, -2}, {1, -2}, {2, -1}};

// -----------------------------------------------------------------------

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
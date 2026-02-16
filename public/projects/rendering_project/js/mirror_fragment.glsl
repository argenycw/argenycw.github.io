// ====== Struct definition ======
struct Light {
	vec3 position;
	vec3 color;
	vec3 ambient;			
};		

struct Ray {					
	vec3 origin;
	vec3 direction;
};

struct Plane {
	vec3 position;
	vec3 normal;
	vec3 vertices[4];
	sampler2D texture;
};

struct Intersection {
	bool hit;
	float t;			
	vec3 hitPoint;
	vec3 normal;
	vec3 color;
};

// ====== Globals =======
uniform vec2 resolution;
uniform vec3 backgroundColor;
uniform Light light;

uniform Plane planes;

varying vec3 vPos;
varying vec3 vNormal;

// ====== Functions ======	
Ray createRay(vec3 ori, vec3 dir) {
	Ray r;					
	r.origin = ori;
	r.direction = dir;
	return r;
}

void intersectPlane(Ray r, Plane p, inout Intersection i) {
	i.hit = false;
	float denom = dot(r.direction, p.normal);
	if (abs(denom) > 0.001) {
		float t = dot(p.position - r.origin, p.normal) / denom;
		if (t > 0.001) {
			// extent check
			vec3 hitPos = r.origin + t * r.direction;
			vec3 edgeVec1 = p.vertices[1] - p.vertices[0];
			vec3 edgeVec2 = p.vertices[3] - p.vertices[1];
			vec3 edgeVec3 = p.vertices[2] - p.vertices[3];
			vec3 edgeVec4 = p.vertices[0] - p.vertices[2];
			if (dot(hitPos - p.vertices[0], edgeVec1) > 0.0 && dot(hitPos - p.vertices[1], edgeVec2) > 0.0 &&
			dot(hitPos - p.vertices[3], edgeVec3) > 0.0 && dot(hitPos - p.vertices[2], edgeVec4) > 0.0) {
				i.hit = true;
				i.t = t;	
				i.hitPoint = hitPos;
				i.normal = p.normal;			
				float u = (t - p.vertices[0]).x / (p.vertices[1] - p.vertices[0]).x;
				float v = 1.0 - (t - p.vertices[0]).z / (p.vertices[2] - p.vertices[0]).z;		
				i.color = texture2D(p.texture, vec2(u, v)).rgb;
			}
		}
	}
}

void intersect(Ray r, inout Intersection i) {
	// So far, only the floor
	intersectPlane(r, planes, i);
}

// ======== Main ========
void main() {
	vec3 N = normalize(vNormal);						
	vec3 dir = normalize(vPos - cameraPosition);
	vec3 reflectedDir = reflect(dir, N);
	Ray r = createRay(vPos, reflectedDir);

	const int DEPTH = 1;
	// start recursive path tracing
	vec3 color = vec3(0, 0, 0);
	for (int depth = 0; depth < DEPTH; depth++) {
		Intersection i;
		intersect(r, i);
		if (i.hit) { // hit
			vec3 L = normalize(light.position - i.hitPoint);
			color += i.color * (dot(i.normal, L) + light.ambient);
		}
		else { // background
			color += backgroundColor;
		}
		r = createRay(i.hitPoint, reflect(r.direction, i.normal));
	}
	gl_FragColor = vec4(color, 1);
}		
import json

def html_template(name, github, linkedin, photo_id, role):
    if photo_id == "":
        photo_id = "person-bw"
    s = """            <div class="col-md-2 col-4 padding-0">
                <picture>
                    <source type="image/webp" srcset="./static/assets/headshots/compressed/{photo_id}.webp" class="timeline-director-img">
                    <source type="image/jpg" srcset="./static/assets/headshots/compressed/{photo_id}.jpg" class="timeline-director-img">
                    <img src="./static/assets/headshots/compressed/{photo_id}.jpg" alt="TAMUhack Director" class="timeline-director-img">
                </picture>
                <p class="timeline-director-name">{name}</p>
                <p class="timeline-director-position">{role}</p>
                <div class="row justify-content-center">""".format(name=name, photo_id=photo_id, role=role)
    if not github == "":
        s+="""
                    <a href="{github}" target="_blank"><img src="./static/assets/horizontal-timeline/github.svg" alt="Github" class="timeline-director-socials"></a>""".format(github=github)
    if not linkedin == "":
        s+="""
                    <a href="{linkedin}" target="_blank"><img src="./static/assets/horizontal-timeline/linkedin.svg" alt="LinkedIn" class="timeline-director-socials"></a>""".format(linkedin=linkedin)
    s+="""
                </div>
            </div>"""
    return s

with open(str(input('Input File Name:'))) as j:
    d = json.load(j)
    print("""        <div class="row">""")
    for p in d:
        print(html_template(p['name'],p['github'],p['linkedin'],p['photo_id'],p['role']))
    print("""        </div>""")
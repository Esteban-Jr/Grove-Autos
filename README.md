# Grove Autos

Website for **Grove Autos**, a family-run accident and bodywork repair centre at 60 Leslie Park Rd, Croydon, CR0 6TP (0208 778 3551).

A single static page (HTML, CSS and a little JavaScript), so there's nothing to build or install:
- `index.html`: the page
- `css/style.css`: the styles
- `js/main.js`: mobile menu, smooth scrolling, reveal animations and the footer year
- `images/gallery/`: the original photos of the garage's own work, from its Facebook page
- `images/opt/`: the small, fast versions the page actually uses (WebP + JPEG at 480, 960 and up to 1600px)
- `scripts/optimize_images.py`: makes `images/opt/` from the originals. **After adding or replacing a photo**, run it with a Python that has Pillow, e.g. `~/Aurea/.venv/bin/python scripts/optimize_images.py`

**Live:** https://esteban-jr.github.io/Grove-Autos/ (GitHub Pages, from `main`)

## Content sources
Everything on the page comes from the garage's current site (groveautos.com) or its Facebook page:
- the about text, services, "insurance approved repairers", "factory-trained staff" and "20 years"
- the three customer reviews, quoted word for word

## Still to confirm with the owner
- [ ] Opening hours (the page currently says "please call ahead")
- [ ] Which insurers or manufacturers they're approved by (an older photo shows a "Nissan Approved Bodyshop" sign)
- [ ] More recent reviews (Google or Facebook) and newer photos
- [ ] Whether this should replace the site at groveautos.com

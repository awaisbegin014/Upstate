import os
import shutil
import urllib.request

MAPPING = {
    "MAG-CVT-1000": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fae061739b3f7abf9b633473eeaa81d31/mag-hmk116ua4-jan181.jpg/400x400",
        "file": "magline-convertible-hand-truck.jpg"
    },
    "MAG-2W-500": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F1f4c65a9910fea86e6805925137827e8/trucks-hand.jpg/400x400",
        "file": "magline-2-wheel-hand-truck.jpg"
    },
    "MAG-PART-WHL10": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Ff2b5748ac57fe0fddfe197b1c495a35f/pc-500-8udg.jpg/400x400",
        "file": "magline-balloon-cushion-wheel.jpg"
    },
    "LR-PJ-5500": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fc98d51ec3ad1ba5ca0c8b8f75a5089f0/trucks-pallet.jpg/400x400",
        "file": "lift-rite-manual-pallet-jack.jpg"
    },
    "WES-PLT-2440": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Feacb03da6fa288746f251f5d86be99fc/trucks-platform.jpg/400x400",
        "file": "wesco-steel-platform-truck.jpg"
    },
    "COL-PL-5PU-S": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F5c22c593d46e54262fd0ec738fe78f10/casters-general_duty1.jpg/400x400",
        "file": "colson-polyurethane-swivel-caster.jpg"
    },
    "COL-PL-5PU-R": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F94c56f0a077562aacd98c18843f82140/casters-medium_duty.jpg/400x400",
        "file": "colson-polyurethane-rigid-caster.jpg"
    },
    "ALB-HD-8PH-S": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Ffc3ee37ae12fbd9bac87b9a789ec383f/casters-heavy_duty1.jpg/400x400",
        "file": "albion-phenolic-swivel-caster.jpg"
    },
    "FAU-STEM-3-L": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fa1baa8c2b5c33603e9ef4760937e7e96/pc-x558-fl.jpg/400x400",
        "file": "faultless-total-lock-stem-caster.jpg"
    },
    "RA-GRV-1810": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fa73752ed6c5a4942f9182d8179be72c3/conveyors-roller.jpg/400x400",
        "file": "roll-away-gravity-roller-conveyor.jpg"
    },
    "RA-SKW-1205": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F284ef40e3b46f7fc3bf031f0d0bfa921/conveyors-skate_wheels.jpg/400x400",
        "file": "roll-away-skatewheel-conveyor.jpg"
    },
    "BDP-FLEX-24": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F246599002901dd47bf4ab65f058a7de5/rc-214-8n.jpg/400x400",
        "file": "best-flex-expandable-roller-conveyor.jpg"
    },
    "ACSI-SYS": {
        "local": "frontend/public/projects/stiefel-pick-line-1.jpg",
        "file": "acsi-engineered-powered-conveyor.jpg"
    },
    "DUR-BMP-4X10": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F6245ce254995279be68a6fc76094100f/dur-l-main-jan26.jpg/400x400",
        "file": "durable-molded-rubber-dock-bumper.jpg"
    },
    "DUR-CHOCK-PU": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F7745fbbf49ac2b1ab5673fed632aaca7/VM-URWC-2-MAIN-JAN26.jpg/400x400",
        "file": "durable-urethane-wheel-chock.jpg"
    },
    "JH-DOCKPLATE-4836": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F6e5525417dbfa4dd573eaba848d262cb/cop-lp48-36.jpg/400x400",
        "file": "copperloy-aluminum-dock-plate.jpg"
    },
    "MCG-LEVELER": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F76e4195a0c3afe9df6401c715c1dbd5e/blu-20ep66-jan19.jpg/400x400",
        "file": "mcguire-hydraulic-dock-leveler.jpg"
    },
    "ADV-DOCKLIFT": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fc939aa35b63d2d40ac9ddb9a8448b922/cop-dk050-60-72x96.jpg/400x400",
        "file": "advance-lift-hydraulic-dock-lift.jpg"
    },
    "FAIR-SEAL": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F1ec6e7bbf9d030e5fa9a02cc8d6be5ec/we-docksealmain-jan21.jpg/400x400",
        "file": "fairborn-foam-dock-seal.jpg"
    },
    "MOR-DRUMTRK": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F8b94e780bbad796a5b23ec30ae3f62b0/trucks-drum.jpg/400x400",
        "file": "morse-drum-hand-truck.jpg"
    },
    "VES-DOLLY-55": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Ffcfa3859f79539d10d945d61e7ce0c59/drums-equipment1.jpg/400x400",
        "file": "vestil-steel-drum-dolly.jpg"
    },
    "ENP-SPILL-4D": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F7803ae005804515e32ccc9325f5f2843/drums-cabinets.jpg/400x400",
        "file": "enpac-4-drum-spill-containment-pallet.jpg"
    },
    "VC-DRUMLIFT": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F014febaf0e3f7445f26232eb8a3f567b/vmfdt-22.jpg/400x400",
        "file": "valley-craft-fork-mount-drum-lifter.jpg"
    },
    "LYON-WB-7230": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F389cc2ae291ed87fc52b0f47ac1cbf04/tables-work1.jpg/400x400",
        "file": "lyon-steel-workbench.jpg"
    },
    "JUS-FLAM-45": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fe7e16154d045e66ce6e70d3a58c17f7f/cabinets-flammable_storage.jpg/400x400",
        "file": "justrite-flammable-safety-cabinet.jpg"
    },
    "PEN-LKR-3T": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F5e823ac00bdd57fb40fc897fbac056d1/te-bs5-121212-1.jpg/400x400",
        "file": "penco-vanguard-triple-tier-locker.jpg"
    },
    "LG-CART-2436": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F8def3d6f08e31f03896fd694e6e29e16/lg-lgl-2436-brk.jpg/400x400",
        "file": "little-giant-steel-service-cart.jpg"
    },
    "COT-RL-8": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F55b09cbfe3e3ead4603922b2e6f04b18/ladders-rolling_ladders.jpg/400x400",
        "file": "cotterman-rolling-steel-ladder.jpg"
    },
    "LOU-RL-5": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fc398ed6f42657d3fdd9b16dc5db5979e/bag-ml093221p.jpg/400x400",
        "file": "louisville-rolling-steel-ladder.jpg"
    },
    "TRI-PLAT-4": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fd9870cb72c688bb767e9c21fde9d83f7/ladders-tilt_n_roll.jpg/400x400",
        "file": "tri-arc-mobile-work-platform.jpg"
    },
    "CUSTOM-LADDER": {
        "local": "frontend/public/projects/target-ladder.jpg",
        "file": "custom-fabricated-ladder-crossover.jpg"
    },
    "SW-LT-2000": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F677a584441df9fc1414b27838b8a7845/tables-scissors.jpg/400x400",
        "file": "southworth-scissor-lift-table.jpg"
    },
    "PRESTO-TT-4": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fbb8a7522ec03d0ca84abedff2c737442/lifts-pallet.jpg/400x400",
        "file": "presto-pallet-turntable.jpg"
    },
    "HAR-HOIST-1T": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F627fcde578a1bd658079f70f5c920229/hh-hsdlb-main-jul24.jpg/400x400",
        "file": "harrington-manual-chain-hoist.jpg"
    },
    "WILDECK-VRC": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Ffb35d3fdccc4d6e1557927036d819382/vm-wl-100-5-main-jan20.jpg/400x400",
        "file": "wildeck-vertical-reciprocating-conveyor.jpg"
    },
    "WILDECK-MEZZ": {
        "local": "frontend/public/projects/ticonderoga-mezzanine-after.jpg",
        "file": "custom-engineered-steel-mezzanine.jpg"
    },
    "ERGO-MAT-35": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F3b664c98f3dea2dacf2974680dc3de12/matting-anti-fatigue1.jpg/400x400",
        "file": "ergomat-anti-fatigue-mat.jpg"
    },
    "NOTRAX-DRAIN-35": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Ffa4b3b9985bbfd75d1f44523d2ac0eb6/matting-drainage1.jpg/400x400",
        "file": "notrax-rubber-drainage-mat.jpg"
    },
    "TURTLE-TILE": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Ffb5e42d9a19481e3ead4754e240a7e04/matting-ergonomic.jpg/400x400",
        "file": "turtle-plastics-interlocking-floor-tile.jpg"
    },
    "AKRO-BIN-30240": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F6a4a6dbaea18beb4a772dacb97eb69d1/am-30210.jpg/400x400",
        "file": "akro-mils-akrobin-stackable-bins.jpg"
    },
    "BUCK-TOTE-2415": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fe8938ae55bd4386c369f48ce650d4ef6/containers-storage.jpg/400x400",
        "file": "buckhorn-attached-lid-container.jpg"
    },
    "RCP-TILT-1": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F384b75cec390783b5dc279d95102a999/containers-waste.jpg/400x400",
        "file": "rubbermaid-commercial-tilt-truck.jpg"
    },
    "TOTER-CART-96": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fc9a83d344049095e7bdf794b5da449c1/containers-bin_box.jpg/400x400",
        "file": "toter-heavy-duty-two-wheel-cart.jpg"
    },
    "RUR-BAY-STARTER": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fead4837b9cc7c036bcb84dcea3134955/racks-pallet.jpg/400x400",
        "file": "ridg-u-rak-selective-pallet-rack.jpg"
    },
    "AWP-DECK-4246": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Fdeada1b7c3e0d197b03550f7e26773db/racks-decking.jpg/400x400",
        "file": "wire-deck-for-pallet-rack.jpg"
    },
    "JARKE-CANT": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F271696aa33b8e9a328637cb33834b8c1/racks-cantilever.jpg/400x400",
        "file": "jarke-cantilever-rack.jpg"
    },
    "PUSHBACK-SYS": {
        "local": "frontend/public/projects/stiefel-pushback.jpg",
        "file": "pushback-drive-in-rack-systems.jpg"
    },
    "EDS-BOLTLESS-4818": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F3761b0d33850075c5956401816c09206/shelving-boltless.jpg/400x400",
        "file": "edsal-boltless-steel-shelving.jpg"
    },
    "METRO-WIRE-2448": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2Ffb0b7319153ded184e1b04d969735f66/shelving-wire1.jpg/400x400",
        "file": "metro-super-erecta-wire-shelving.jpg"
    },
    "TENN-ARCH-36": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F9963ffb999deb48efa7de757811801af/du-97-1618.jpg/400x400",
        "file": "tennsco-archive-shelving.jpg"
    },
    "RAPID-RACK-6024": {
        "url": "https://assets-smo-prod.roccommercecloud.com/cdn-cgi/imagedelivery/LtMD2-yac1d5teL5q3QR1A/roc%2Fsmo%2F677b2d5c47d2608744ccd4a565e1f055/shelving-bulk_rack.jpg/400x400",
        "file": "rapid-rack-bulk-storage-rack.jpg"
    }
}

dest_frontend = "frontend/public/images/products"
dest_backend = "backend/uploads/products"
os.makedirs(dest_frontend, exist_ok=True)
os.makedirs(dest_backend, exist_ok=True)

success_count = 0
for sku, info in MAPPING.items():
    filename = info["file"]
    target_fe = os.path.join(dest_frontend, filename)
    target_be = os.path.join(dest_backend, filename)
    
    if "local" in info:
        src = info["local"]
        if os.path.exists(src):
            shutil.copy2(src, target_fe)
            shutil.copy2(src, target_be)
            print(f"✓ [LOCAL]  {sku:20} -> {filename}")
            success_count += 1
        else:
            print(f"✗ [MISSING] {src}")
    elif "url" in info:
        url = info["url"]
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read()
                with open(target_fe, "wb") as f:
                    f.write(data)
                with open(target_be, "wb") as f:
                    f.write(data)
                print(f"✓ [NET]    {sku:20} -> {filename} ({len(data)} bytes)")
                success_count += 1
        except Exception as e:
            print(f"✗ [ERROR]  {sku:20} -> {e}")

print(f"\nDone! Successfully saved {success_count}/{len(MAPPING)} product images!")

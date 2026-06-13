from manim import *
from ...base import AlgoScene, ArrayVis


class CombinationSum(AlgoScene):
    TITLE = "Combination Sum"
    SUBTITLE = "Find all unique combinations that sum to a target."
    CATEGORY = "backtracking"

    def build(self):
        # ── Stage 1: Introduction ───────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.5)

        intro_text = VGroup(
            Text("Given a list of candidates and a target,", font_size=30, color=INK),
            Text("find all unique combinations that sum to the target.", font_size=30, color=INK),
            Text("Each candidate may be used any number of times.", font_size=28, color=GRAY),
            Text("The solution uses backtracking to explore all possibilities.", font_size=26, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        intro_text.next_to(intro_label, DOWN, buff=0.7)
        self.play(FadeIn(intro_text, run_time=0.8))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(intro_label))
        self.wait(0.3)

        # ── Stage 2: Problem Setup ──────────────────────────────────────────
        setup_label = self.chapter_title("Problem Setup")
        self.wait(0.5)

        candidates = [2, 3, 6, 7]
        target = 7

        cand_vis = ArrayVis(self, candidates)
        self.wait(0.5)

        setup_info = VGroup(
            Text(f"Candidates: {candidates}", font_size=28, color=INK),
            Text(f"Target: {target}", font_size=28, color=COBALT),
            Text("Find all combinations that sum to 7.", font_size=26, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        setup_info.next_to(cand_vis.get_group(), DOWN, buff=1.0)
        self.play(FadeIn(setup_info))
        self.wait(2)
        self.play(FadeOut(setup_info), FadeOut(setup_label))
        self.wait(0.3)

        # ── Stage 3: Backtracking Concept ──────────────────────────────────
        bt_label = self.chapter_title("Step 1 — Backtracking Strategy")
        self.wait(0.5)

        bt_text = VGroup(
            Text("At each step, we try adding a candidate to our current path.", font_size=26, color=INK),
            Text("If the sum equals target → record the combination.", font_size=26, color=SIGNAL),
            Text("If the sum exceeds target → backtrack (prune this branch).", font_size=26, color=CORAL),
            Text("We only pick candidates at the current index or later,", font_size=24, color=GRAY),
            Text("avoiding duplicate combinations.", font_size=24, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        bt_text.next_to(cand_vis.get_group(), DOWN, buff=0.8)
        self.play(FadeIn(bt_text))
        self.wait(2.5)
        self.play(FadeOut(bt_text), FadeOut(bt_label))
        self.wait(0.3)

        # ── Stage 4: Explore candidate 2 ───────────────────────────────────
        explore2_label = self.chapter_title("Step 2 — Explore Starting with 2")
        self.wait(0.5)

        cand_vis.set_color([0], C_ACTIVE)
        self.wait(0.4)

        path_title = Text("Current path:", font_size=26, color=INK)
        path_title.to_edge(LEFT, buff=1.0)
        path_title.shift(DOWN * 0.5)
        self.play(FadeIn(path_title))

        # Show path building: [] -> [2] -> [2,2] -> [2,2,2] -> [2,2,2,2] prune
        paths = [
            ("[2]", "sum=2, continue"),
            ("[2, 2]", "sum=4, continue"),
            ("[2, 2, 2]", "sum=6, continue"),
            ("[2, 2, 2, 2]", "sum=8 > 7, PRUNE"),
        ]

        path_mobs = []
        for path_str, note_str in paths:
            color = CORAL if "PRUNE" in note_str else COBALT
            path_mob = VGroup(
                Text(path_str, font_size=26, color=color),
                Text(f"  ({note_str})", font_size=22, color=GRAY),
            ).arrange(RIGHT, buff=0.2)
            path_mobs.append(path_mob)

        path_group = VGroup(*path_mobs).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        path_group.next_to(path_title, DOWN, buff=0.4)
        path_group.align_to(path_title, LEFT)

        for mob in path_mobs:
            self.play(FadeIn(mob, run_time=0.5))
            self.wait(0.5)

        self.wait(1)

        # Backtrack to [2,2,2] and try [2,2,2,3] -> sum=9 prune, then [2,2,3] sum=7 found!
        found_note = VGroup(
            Text("[2, 2, 3]", font_size=28, color=SIGNAL, weight="BOLD"),
            Text("  sum=7 == target → FOUND!", font_size=24, color=SIGNAL),
        ).arrange(RIGHT, buff=0.2)
        found_note.next_to(path_group, DOWN, buff=0.4)
        found_note.align_to(path_group, LEFT)
        self.play(FadeIn(found_note, run_time=0.6))
        self.wait(1.5)

        self.play(FadeOut(path_title), FadeOut(path_group), FadeOut(found_note))
        cand_vis.reset_colors()
        self.play(FadeOut(explore2_label))
        self.wait(0.3)

        # ── Stage 5: Explore candidate 3 and 7 ────────────────────────────
        explore3_label = self.chapter_title("Step 3 — Explore Starting with 3 and 7")
        self.wait(0.5)

        cand_vis.set_color([1], C_ACTIVE)
        self.wait(0.4)

        results_title = Text("Continuing the search:", font_size=26, color=INK)
        results_title.to_edge(LEFT, buff=1.0)
        results_title.shift(DOWN * 0.3)
        self.play(FadeIn(results_title))

        explore_paths = [
            ("[3, 3]", "sum=6, continue", COBALT),
            ("[3, 3, 3]", "sum=9 > 7, PRUNE", CORAL),
            ("[3, 4] — 4 not in candidates", "skip", GRAY),
            ("[7]", "sum=7 == target → FOUND!", SIGNAL),
        ]

        ep_mobs = []
        for path_str, note_str, color in explore_paths:
            mob = VGroup(
                Text(path_str, font_size=25, color=color),
                Text(f"  ({note_str})", font_size=21, color=GRAY),
            ).arrange(RIGHT, buff=0.2)
            ep_mobs.append(mob)

        ep_group = VGroup(*ep_mobs).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        ep_group.next_to(results_title, DOWN, buff=0.4)
        ep_group.align_to(results_title, LEFT)

        for mob in ep_mobs:
            self.play(FadeIn(mob, run_time=0.5))
            self.wait(0.5)

        self.wait(1.5)

        cand_vis.set_color([2, 3], SIGNAL)
        self.wait(0.5)

        self.play(FadeOut(results_title), FadeOut(ep_group))
        cand_vis.reset_colors()
        self.play(FadeOut(explore3_label))
        self.wait(0.3)

        # ── Stage 6: All Results Found ─────────────────────────────────────
        results_label = self.chapter_title("Step 4 — All Combinations Found")
        self.wait(0.5)

        cand_vis.mark_sorted(list(range(len(candidates))))
        self.wait(0.4)

        result_header = Text("All unique combinations summing to 7:", font_size=28, color=INK)
        result_header.to_edge(LEFT, buff=1.0)
        result_header.shift(DOWN * 0.2)
        self.play(FadeIn(result_header))

        combos = [
            "[2, 2, 3]  →  2 + 2 + 3 = 7",
            "[7]        →  7 = 7",
        ]

        combo_mobs = VGroup()
        for c in combos:
            m = Text(c, font_size=28, color=SIGNAL, weight="BOLD")
            combo_mobs.add(m)
        combo_mobs.arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        combo_mobs.next_to(result_header, DOWN, buff=0.5)
        combo_mobs.align_to(result_header, LEFT)

        self.play(FadeIn(combo_mobs, run_time=0.8))
        self.wait(2)

        summary_note = Text(
            "Backtracking explored all valid paths and pruned invalid ones.",
            font_size=24,
            color=GRAY,
        )
        summary_note.next_to(combo_mobs, DOWN, buff=0.6)
        self.play(FadeIn(summary_note))
        self.wait(2)

        self.play(
            FadeOut(result_header),
            FadeOut(combo_mobs),
            FadeOut(summary_note),
            FadeOut(results_label),
            FadeOut(cand_vis.get_group()),
        )
        self.wait(0.3)

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        complexity_label = self.chapter_title("Complexity Analysis")
        self.wait(0.5)

        self.complexity_card(
            time_best=r"O(n^{T/M})",
            time_avg=r"O(n^{T/M})",
            time_worst=r"O(n^{T/M})",
            space=r"O(T/M)",
        )
        self.wait(2.5)

        note = VGroup(
            Text("n = number of candidates, T = target, M = min candidate value", font_size=20, color=GRAY),
            Text("Space O(T/M) is the maximum recursion depth.", font_size=20, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        note.to_edge(DOWN, buff=1.0)
        self.play(FadeIn(note))
        self.wait(2)
        self.play(FadeOut(note), FadeOut(complexity_label))
        self.wait(0.5)

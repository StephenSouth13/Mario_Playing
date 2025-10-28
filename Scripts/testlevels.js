/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */
 
/* LEVELS ORIGINALLY BY MARTIN BUCHNER & PATRICK SAAR */
/* MODIFIED TO 3 LEVELS, 4 QUESTIONS EACH + CHECKPOINTS */

var definedLevels = [
{ // Level 0 (ID=0) - Sẽ nhận Câu 0, 1, 2, 3
	width: 252,
	height: 15,
	id: 0,
	background: 1,
	data:
	[
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 0
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 1
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_left' , 'pipe_left' , 'pipe_left_grass' , 'pipe_left_soil'], // 2
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right_grass' , 'pipe_right_soil'], // 3
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 4
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'mario' , 'grass_top' , 'soil'], // 5
	['' , '' , '' , '' , '' , '' , '' , '' , '' , 'multiple_coinbox' , '' , '' , '' , 'grass_top' , 'soil'], // 6
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_left'], // 7
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_middle'], // 8
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_right'], // 9
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 10
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 11
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 12
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 13
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 14
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 15
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_left' , 'grass_top' , 'soil'], // 16
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle' , 'grass_top' , 'soil'], // 17
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle_right' , 'grass_top' , 'soil'], // 18
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_right' , 'grass_top' , 'soil'], // 19
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 20
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 21
	['' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 22: Q0 (thay mushroombox)
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 23
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 24
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top' , 'soil'], // 25
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_left' , 'pipe_left' , 'pipe_left_grass' , 'pipe_left_soil'], // 26
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right_grass' , 'pipe_right_soil'], // 27
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 28
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 29
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 30
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 31
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 32
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 33
	['' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil'], // 34: Q1 (thay coinbox)
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil'], // 35
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 36
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 37
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 38
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 39
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 40
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 41
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_left' , 'pipe_left' , 'pipe_left_grass' , 'pipe_left_soil'], // 42
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right_grass' , 'pipe_right_soil'], // 43
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 44
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 45
	['' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 46: Q2 (thay coinbox)
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 47
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 48
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 49
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 50
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 51
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 52
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top' , 'soil'], // 53
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_left' , 'grass_left' , 'grass_top_left_corner' , 'soil'], // 54
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 55
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 56
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 57
	['' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , '' , 'grass_top' , 'soil' , 'planted_soil_left' , 'soil' , 'soil'], // 58
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'grass_top' , 'soil' , 'planted_soil_right' , 'soil' , 'soil'], // 59
	['' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 60
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 61
	['' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 62
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 63
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 64
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 65
	['' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil'], // 66
	['' , '' , '' , '' , '' , '' , '' , 'pipe_top_left' , 'pipe_left' , 'pipe_left' , 'pipe_left_grass' , 'pipe_left_soil' , 'pipe_left_soil' , 'pipe_left_soil' , 'pipe_left_soil'], // 67
	['' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right' , 'pipe_right' , 'pipe_right' , 'pipe_right' , 'pipe_right_grass' , 'pipe_right_soil'], // 68
	['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 69
	['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 70
	['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 71: Q3 (thay coinbox)
	['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 72
	['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 73
	['' , '' , '' , '' , 'ballmonster' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 74
	// ... (Rest of Level 0 data - giữ nguyên) ...
	['' , '' , '' , '' , '' , '' , '' , '' , '' , 'checkpoint' , '' , '' , '' , 'grass_top' , 'soil'], // 142: CHECKPOINT (thay coinbox)
	// ... (Rest of Level 0 data - giữ nguyên) ...
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'] // Col 251 (last column)
	]
}
	,
{ // Level 1 (ID=1) - Sẽ nhận Câu 4, 5, 6, 7
	width: 220,
	height: 15,
	id: 1,
	background: 1,
	data:
	[
	['','','','','','','','','','','','','','grass_top','planted_soil_middle'], // 0
	['','','','','','','','','','','','','','grass_top','planted_soil_middle'], // 1
	['','','','','','','','','','','','','mario','grass_top','planted_soil_right'], // 2: Mario Start
	['','','','','','','','','','','','','','grass_top','soil'], // 3
	['','','','','','','','','','','','','','grass_top','soil'], // 4
	['','','','','','','','','coinbox','','','','','grass_top','soil'], // 5
	['','','','','','','','','questionbox','','','','','grass_top','soil'], // 6: Q4 (thay mushroombox)
	['','','','','','','','','coinbox','','','','bush_left','grass_top','soil'], // 7
	// ... (Level 1 data continued) ...
	['','','','','','','','','','grass_top_left','grass_left','grass_left','grass_top_left_corner','soil','soil'], // 37
	['','','','','','','','','bush_left','grass_top','soil','soil','soil','soil','soil'], // 38
	['','','','','','','','','bush_right','grass_top','soil','planted_soil_left','soil','soil','soil'], // 39
	['','','','','','','','','','grass_top','soil','planted_soil_middle','soil','soil','soil'], // 40
	['','','','','','','','','','grass_top','soil','planted_soil_right','soil','soil','soil'], // 41
	['','','','','','','','','greenturtle','grass_top_right','grass_right','grass_right','grass_right','grass_right','grass_right'], // 42
	['','','','','','','','','','brown_block','','','','',''], // 43
	['','','','','','','','','coin','brown_block','','','','',''], // 44
	['','','','','','','','','','brown_block','','','','',''], // 45
	['','','','','','','','','','','brown_block','','','',''], // 46
	['','','','','','','','','','coin','brown_block','','','',''], // 47
	['','','','','','','','','','','brown_block','','','',''], // 48
	['','','','','','','','','','','','brown_block','','',''], // 49
	['','','','','','','','','','','coin','brown_block','','',''], // 50
	['','','','','','','','','','','','brown_block','','',''], // 51
	['','','','','','','','','','','','','brown_block','',''], // 52
	['','','','','','','','','','','','coin','brown_block','',''], // 53
	['','','','','','','','','','','','','brown_block','',''], // 54
	['','','','','','','','','','','','','grass_top_left','grass_left','grass_left'], // 55
	['','','','','','','','','','','','bush_left','grass_top','soil','soil'], // 56
	['','','','','','','','','coinbox','','','bush_middle_right','grass_top','soil','soil'], // 57
	['','','','','','','','','brown_block','','','bush_middle','grass_top','soil','soil'], // 58
	['','','','','','','','','questionbox','','','bush_right','grass_top','soil','soil'], // 59: Q5 (thay mushroombox)
	['','','','','','','','','brown_block','','','','grass_top','soil','planted_soil_left'], // 60
	['','','','','','','','','coinbox','','','','grass_top','soil','planted_soil_middle'], // 61
	['','','','','','','','','','','','spikedturtle','grass_top','soil','planted_soil_right'], // 62
	['','','','','','','','','','','','','grass_top_right','grass_right','grass_right'], // 63
	['','','','','','','','','','','','','','',''], // 64
	['','','','','','','','','','','','','','',''], // 65
	['','','','','','','','','','','','','grass_top_left','grass_left','grass_left'], // 66
	['','','','','','','','','','','','','grass_top','planted_soil_left','soil'], // 67
	['','','','','','','','','','','','ballmonster','grass_top','planted_soil_right','soil'], // 68
	['','','','','','','','','','','','','grass_top','soil','soil'], // 69
	['','','','','','','','','questionbox','','','bush_left','grass_top','soil','soil'], // 70: Q6 (thay starbox)
	['','','','','','','','','','','','bush_middle_right','grass_top','soil','soil'], // 71
	['','','','','','','','','','','','bush_middle','grass_top','soil','soil'], // 72
	['','','','','','','','','','','','bush_right','grass_top','soil','soil'], // 73
	['','','','','','','','','','','','','grass_top','soil','soil'], // 74
	['','','','','','','','','','','','','grass_top','soil','soil'], // 75
	['','','','','','','','','','','pipe_top_left','pipe_left','pipe_left_grass','pipe_left_soil','pipe_left_soil'], // 76
	['','','','','','','','','','','pipe_top_right','pipe_right','pipe_right_grass','pipe_right_soil','pipe_right_soil'], // 77
	['','','','','','','','','','','','','grass_top','soil','soil'], // 78
	['','','','','','','','','','','','','grass_top','soil','planted_soil_left'], // 79
	['','','','','','','','','','','','','grass_top','soil','planted_soil_middle'], // 80
	['','','','','','','','','questionbox','','','greenturtle','grass_top','soil','planted_soil_right'], // 81: Q7 (thay coinbox)
	['','','','','','','','','','','','','grass_top','soil','soil'], // 82
	['','','','','','','','','','','','spikedturtle','grass_top','soil','soil'], // 83
	// ... (Rest of Level 1 data) ...
	['','','','','','','','','','','','','','grass_top_right_rounded','soil_right'], // 159
	['','','','','','','','','','','','','','',''], // 160
	['','','','','','','','','','','','','','',''], // 161
	['','','','','','','','','','','','','','grass_top_left_rounded','soil_left'], // 162
	['','','','','','','','','','','','','','grass_top','soil'], // 163
	['','','','','','','','','','','','','','grass_top','soil'], // 164
	['','','','','','','','','','','','','bush_left','grass_top','soil'], // 165
	['','','','','','','','','','','','','bush_middle','grass_top','soil'], // 166
	['','','','','','','','','','','','','bush_middle_left','grass_top','soil'], // 167
	['','','','','','','','','','','','','bush_right','grass_top','soil'], // 168
	['','','','','','','','','','','','','','grass_top','soil'], // 169
	['','','','','','','coin','coin','','','','pipe_top_left','pipe_left','pipe_left_grass','pipe_left_soil'], // 170
	['','','','','','','coin','coin','','','','pipe_top_right','pipe_right','pipe_right_grass','pipe_right_soil'], // 171
	['','','','','','','','','','','','','','grass_top','soil'], // 172
	['','','','','','','','','','','','','','grass_top','soil'], // 173
	['','','','','','','','','','checkpoint','','','','grass_top','soil'], // 174: CHECKPOINT 2 (thay mushroombox)
	// ... (Rest of Level 1 data) ...
	['','','','','','','','','','','','','','grass_top','planted_soil_middle'] // Col 219 (last column)
	]
}
	,
{ // Level 2 (ID=2) - Sẽ nhận Câu 8, 9, 10, 11
	width: 220,
	height: 15,
	id: 2,
	background: 8, // Nền hang động
	data:
	[
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 0
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'mario' , 'grass_top'], // 1: Mario Start
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 2
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 3
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 4
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coin' , 'brown_block' , 'grass_top'], // 5
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 6
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 7
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'greenturtle' , 'grass_top'], // 8
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_left' , 'grass_top'], // 9
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle_left' , 'grass_top'], // 10
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_right' , 'grass_top'], // 11
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coin' , 'coin' , 'brown_block' , 'brown_block' , 'grass_top'], // 12
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 13
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 14
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'greenturtle' , 'grass_top'], // 15
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 16
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 17
	['' , '' , '' , '' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top'], // 18
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 19
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 20
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'greenturtle' , 'grass_top'], // 21
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left_rounded' , 'soil_left' , 'soil_left' , 'grass_top'], // 22
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'grass_top'], // 23
	['' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'grass_top' , 'planted_soil_left' , 'soil' , 'grass_top_right_rounded_soil'], // 24
	['' , '' , '' , '' , '' , '' , 'coin' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_middle' , 'soil' , 'soil'], // 25
	['' , '' , '' , '' , '' , '' , '' , 'coin' , '' , '' , '' , 'grass_top' , 'planted_soil_middle' , 'soil' , 'soil'], // 26
	['' , '' , '' , '' , '' , '' , 'coin' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_middle' , 'soil' , 'soil'], // 27
	['' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'grass_top' , 'planted_soil_middle' , 'soil' , 'soil'], // 28
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_right' , 'soil' , 'soil'], // 29
	['' , '' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 30
	['' , '' , '' , '' , '' , 'coin' , '' , '' , 'coin' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 31
	['' , '' , '' , '' , '' , 'coin' , '' , '' , 'coin' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 32
	['' , '' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 33
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'planted_soil_left' , 'soil'], // 34
	['' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'grass_top' , 'soil' , 'planted_soil_middle' , 'soil'], // 35
	['' , '' , '' , '' , '' , 'coin' , '' , '' , 'coin' , '' , '' , 'grass_top' , 'soil' , 'planted_soil_right' , 'soil'], // 36
	['' , '' , '' , '' , '' , 'coin' , '' , '' , 'coin' , 'coin' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 37
	['' , '' , '' , '' , '' , '' , 'coin' , 'coin' , '' , '' , 'coin' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 38
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 39
	['' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'coin' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 40
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_left' , 'soil' , 'soil'], // 41
	['' , '' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'coin' , '' , 'grass_top' , 'planted_soil_middle' , 'soil' , 'soil'], // 42
	['' , '' , '' , '' , '' , 'coin' , '' , '' , '' , '' , 'coin' , 'grass_top' , 'planted_soil_middle' , 'soil' , 'soil'], // 43
	['' , '' , '' , '' , '' , 'coin' , '' , '' , '' , '' , 'coin' , 'grass_top' , 'planted_soil_right' , 'soil' , 'soil'], // 44
	['' , '' , '' , '' , '' , '' , 'coin' , 'coin' , 'coin' , 'coin' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 45
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 46
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 47
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 48
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 49
	['' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_left'], // 50
	['' , '' , '' , '' , '' , '' , 'pipeplant' , 'pipe_top_left' , 'pipe_left' , 'pipe_left' , 'pipe_left' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_middle'], // 51
	['' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right' , 'pipe_right' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_right'], // 52
	['' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 53
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 54
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 55
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil'], // 56
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'planted_soil_left' , 'soil'], // 57
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'planted_soil_middle' , 'soil'], // 58
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'planted_soil_middle' , 'soil'], // 59
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_top_right_corner' , 'planted_soil_right' , 'soil'], // 60
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 61
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top' , 'soil' , 'soil'], // 62
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 63
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , 'grass_top' , 'soil' , 'soil'], // 64
	['' , '' , '' , '' , '' , '' , '' , '' , '' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 65
	['' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , 'brown_block' , '' , 'grass_top' , 'soil' , 'soil'], // 66
	['' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'coin' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 67
	['' , '' , '' , '' , '' , 'brown_block' , '' , 'brown_block' , '' , '' , 'brown_block' , '' , 'grass_top' , 'soil' , 'soil'], // 68
	['' , '' , '' , '' , '' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 69
	['' , '' , '' , 'brown_block' , '' , 'brown_block' , '' , 'brown_block' , '' , '' , 'brown_block' , '' , 'grass_top' , 'soil' , 'soil'], // 70
	['' , '' , '' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 71
	['' , 'brown_block' , 'coin' , 'brown_block' , '' , 'multiple_coinbox' , '' , 'coinbox' , '' , '' , 'questionbox' , '' , 'grass_top' , 'soil' , 'soil'], // 72: Q8 (thay mushroombox)
	['' , '' , '' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 73
	['' , '' , '' , 'brown_block' , '' , 'brown_block' , '' , 'brown_block' , '' , '' , 'brown_block' , '' , 'grass_top' , 'soil' , 'soil'], // 74
	['' , '' , '' , '' , '' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 75
	['' , '' , '' , '' , '' , 'brown_block' , '' , 'brown_block' , '' , '' , 'brown_block' , '' , 'grass_top' , 'soil' , 'soil'], // 76
	['' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'coin' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 77
	['' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , 'brown_block' , '' , 'grass_top' , 'soil' , 'soil'], // 78
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 79
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , 'grass_top' , 'soil' , 'soil'], // 80
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 81
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top' , 'soil' , 'soil'], // 82
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 83
	['' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 84: Q9 (thay coinbox)
	['' , '' , '' , 'coinbox' , '' , '' , '' , 'coinbox' , '' , '' , '' , '' , 'grass_top_right' , 'grass_top_right_corner' , 'soil'], // 85
	['' , '' , '' , 'coinbox' , '' , '' , '' , 'coinbox' , '' , '' , '' , 'pipeplant' , 'pipe_top_left' , 'grass_top' , 'soil'], // 86
	['' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , '' , '' , 'pipe_top_right' , 'grass_top' , 'soil'], // 87
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_top_left_corner' , 'soil'], // 88
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_right' , 'grass_right'], // 89
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 90
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 91
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 92
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_left' , 'grass_left'], // 93
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 94
	['' , '' , '' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil' , 'soil'], // 95
	['' , '' , '' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil' , 'soil'], // 96
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 97
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_right' , 'grass_top_right_corner'], // 98
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 99
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 100
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 101
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 102
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top'], // 103
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 104
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 105
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 106
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 107
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 108
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'grass_top'], // 109
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 110
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 111
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 112
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top'], // 113
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 114
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 115
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 116
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'grass_top'], // 117
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top'], // 118
	['' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_top_left_corner'], // 119
	['' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 120
	['' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 121
	['' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_left' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 122: Q10 (thay starbox)
	['' , '' , '' , '' , '' , 'bush_left' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_middle' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 123
	['' , '' , '' , '' , '' , 'bush_middle_left' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_middle' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 124
	['' , 'coin' , 'coin' , '' , '' , 'bush_middle' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_right' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 125
	['' , 'coin' , 'coin' , '' , '' , 'bush_middle_right' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 126
	['' , 'coin' , 'coin' , '' , '' , 'bush_middle' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'planted_soil_left' , 'soil'], // 127
	['' , 'coin' , 'coin' , '' , '' , 'bush_right' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'planted_soil_middle' , 'soil'], // 128
	['' , 'coin' , 'coin' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'planted_soil_right' , 'soil'], // 129
	['' , 'coin' , 'coin' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 130
	['' , 'coin' , 'coin' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 131
	['' , 'coin' , 'coin' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 132
	['' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right'], // 133
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 134
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 135
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left'], // 136
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 137
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top'], // 138
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 139
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 140
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_top_left_corner'], // 141
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 142
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 143
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top' , 'soil'], // 144
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 145
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 146
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 147
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_top_right_corner'], // 148
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 149
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 150
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 151
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 152
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top'], // 153
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 154
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_top_left_corner'], // 155
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 156
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top' , 'soil'], // 157
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_left' , 'grass_top' , 'soil'], // 158
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle_left' , 'grass_top' , 'soil'], // 159
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle' , 'grass_top' , 'soil'], // 160
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_right' , 'grass_top' , 'soil'], // 161
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top' , 'soil'], // 162
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 163
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 164
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_top_right_corner'], // 165
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 166
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 167
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 168
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , 'grass_top'], // 169: Q11 (thay coinbox)
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , 'grass_top'], // 170
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipeplant' , 'pipe_top_left' , 'pipe_left' , 'pipe_left' , 'pipe_left_grass'], // 171
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right' , 'pipe_right_grass'], // 172
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , 'grass_top'], // 173
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , 'grass_top'], // 174
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 175
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 176
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 177
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 178
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 179
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'grass_top'], // 180
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top'], // 181: Q12 (thay brown_block)
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 182
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 183
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 184
	['' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , 'grass_top'], // 185
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 186
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 187
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 188
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'greenturtle' , 'grass_top'], // 189
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 190
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 191
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'greenturtle' , 'grass_top'], // 192
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 193
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 194
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 195
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'bush_left' , 'grass_top'], // 196
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'bush_middle_left' , 'grass_top'], // 197
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'bush_middle' , 'grass_top'], // 198
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'bush_right' , 'grass_top'], // 199
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 200
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 201
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right'], // 202
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , ''], // 203
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , ''], // 204
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left'], // 205
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 206
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 207
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 208
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 209
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 210
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 211
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_left' , 'grass_top'], // 212
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle_left' , 'grass_top'], // 213
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle' , 'grass_top'], // 214
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_right' , 'grass_top'], // 215
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 216
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 217
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 218
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'] // 219
	]
}
	,
{ // Level 3 (ID=3) - Sẽ nhận Câu 10, 11, 12 (và 1 câu dự phòng)
	width: 194,
	height: 15,
	id: 3,
	background: 8, // Nền hang động
	data:
	[
	['','','','','','','','','','','','','','grass_top','soil'], // 0
	['','','','','','','','','','','','pipe_top_left','pipe_left','pipe_left_grass','pipe_left_soil'], // 1
	['','','','','','','','','','','','pipe_top_right','pipe_right','pipe_right_grass','pipe_right_soil'], // 2
	['','','','','','','','','','','','','','grass_top','soil'], // 3
	['','','','','','','','','','','','','','grass_top','soil'], // 4
	['','','','','','','','','','','','','mario','grass_top','soil'], // 5 - Mario Start
	['','','','','','','','','','','','','','grass_top','soil'], // 6
	['','','','','','','','','','','','','','grass_top','soil'], // 7
	['','','','','','','','','questionbox','','','','','grass_top','soil'], // 8: Q10 (thay coinbox)
	['','','','','','','','','brown_block','','','','','grass_top','soil'], // 9
	['','','','','','','','','questionbox','','','','','grass_top','soil'], // 10: Q11 (thay mushroombox)
	['','','','','','','','spikedturtle','brown_block','','','','','grass_top','soil'], // 11
	['','','','','','','','','coinbox','','','','','grass_top','soil'], // 12
	['','','','','','','','','','','','','','grass_top','soil'], // 13
	['','','','','','','','','','','','','','grass_top','soil'], // 14
	['','','','','','','stone','','','','','','','grass_top','soil'], // 15
	['','','multiple_coinbox','','','','stone','','','','','','','grass_top_right_rounded','soil_right'], // 16
	['','','','','','','stone','','','','','','','',''], // 17
	['','','','','','','','','','','','','','',''], // 18
	['','','','','','','','','','','','','grass_top_left_rounded','soil_left','soil_left'], // 19
	['','','','','','','','','','','','','grass_top','soil','soil'], // 20
	['','','','','','','','','','','','','grass_top','soil','soil'], // 21
	['','','','','','','','','','','','','grass_top','soil','soil'], // 22
	['','','','','','','','','','','','','grass_top','soil','soil'], // 23
	['','','','','','','','','','','','greenturtle','grass_top','soil','grass_top_left_rounded_soil'], // 24
	['','','','','','','','','','','','','grass_top','planted_soil_left','grass_top'], // 25
	['','','','','','','','','','','','questionbox','grass_top','planted_soil_right','grass_top'], // 26: Q12 (thay mushroombox)
	['','','','','','','','','','','','stone','grass_top','soil','grass_top'], // 27
	// ... (Rest of Level 3 data - giữ nguyên) ...
	['','','','','','','','','','','','grass_top','soil','soil','soil'] // Col 193 (last column)
	]
}
,
// --- CÁC MÀN CHƠI CÒN LẠI (ID 4 ĐẾN 14) GIỮ NGUYÊN ---
// (Bạn có thể thêm câu hỏi vào đây nếu muốn, hoặc xóa các màn này đi)
{
	width: 203,
	height: 15,
	id: 4,
	background: 8,
	data:
	[
	// ... (Dữ liệu gốc màn 4) ...
	['','','','','','','','','','','','','','grass_top','soil']
	]
}
, 
{
	width: 140,
	height: 15,
	id: 5,
	background: 3,
	data:
	[
	// ... (Dữ liệu gốc màn 5) ...
	]
}
, 
{
	width: 165,
	height: 15,
	id: 6,
	background: 3,
	data:
	[
	// ... (Dữ liệu gốc màn 6) ...
	]
}
, 
{
	width: 177,
	height: 15,
	id: 7,
	background: 5,
	data:
	[
	// ... (Dữ liệu gốc màn 7) ...
	]
}
, 
{
	width: 181,
	height: 15,
	id: 8,
	background: 5,
	data:
	[
	// ... (Dữ liệu gốc màn 8) ...
	]
}
, 
{
	width: 242,
	height: 15,
	id: 9,
	background: 6,
	data:
	[
	// ... (Dữ liệu gốc màn 9) ...
	]
}
, 
{
	width: 161,
	height: 15,
	id: 10,
	background: 6,
	data:
	[
	// ... (Dữ liệu gốc màn 10) ...
	]
}
, 
{
	width: 106,
	height: 15,
	id: 11,
	background: 2,
	data:
	[
	// ... (Dữ liệu gốc màn 11) ...
	]
}
, 
{ // Level 12 (ID=12) - Màn cuối có Peach
	width: 233,
	height: 15,
	id: 12,
	background: 2,
	data:
	[
	// ... (Dữ liệu gốc màn 12) ...
	]
}
, 
{
	width: 162,
	height: 15,
	id: 13,
	background: 2,
	data:
	[
	// ... (Dữ liệu gốc màn 13) ...
	]
}
, 
{ // Level 14 (ID=14) - Màn cuối
	width: 155,
	height: 15,
	id: 14,
	background: 4,
	data:
	[
	// ... (Dữ liệu gốc màn 14) ...
	]
}
];


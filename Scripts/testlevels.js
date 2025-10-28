/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */
 
/* LEVELS ORIGINALLY BY MARTIN BUCHNER & PATRICK SAAR */
/* MODIFIED TO 3 LEVELS, 4 QUESTIONS EACH (12 TOTAL) */

var definedLevels = [
{ // Level 0 (ID=0) - Sẽ nhận Câu 1, 2, 3, 4
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
	['' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 22: Q1 (thay mushroombox)
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
	['' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil'], // 34: Q2 (thay coinbox)
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
	['' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 46: Q3 (thay coinbox)
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
	['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 71: Q4 (thay coinbox)
	['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 72
	['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 73
	['' , '' , '' , '' , 'ballmonster' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 74
	// ... (Rest of Level 0 data - giữ nguyên) ...
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'] // Col 251 (last column)
	]
}
	,
{ // Level 1 (ID=1) - Sẽ nhận Câu 5, 6, 7, 8
	width: 220,
	height: 15,
	id: 1,
	background: 1,
	data:
	[
	['','','','','','','','','','','','','','grass_top','planted_soil_middle'], // 0
	['','','','','','','','','','','','','','grass_top','planted_soil_middle'], // 1
	['','','','','','','','','','','','','mario','grass_top','planted_soil_right'], // 2
	['','','','','','','','','','','','','','grass_top','soil'], // 3
	['','','','','','','','','','','','','','grass_top','soil'], // 4
	['','','','','','','','','coinbox','','','','','grass_top','soil'], // 5
	['','','','','','','','','questionbox','','','','','grass_top','soil'], // 6: Q5 (thay mushroombox)
	['','','','','','','','','coinbox','','','','bush_left','grass_top','soil'], // 7
	['','','','','','','','','','','','','bush_middle_left','grass_top','soil'], // 8
	['','','','','','','','','','','','','bush_middle','grass_top','soil'], // 9
	['','','','','','','','','','','','','bush_middle_right','grass_top','soil'], // 10
	['','','','','','','','','','','','','bush_right','grass_top','soil'], // 11
	['','','','','','','','','','','','','','grass_top','soil'], // 12
	['','','','','','','','','','','','','','grass_top','soil'], // 13
	['','','','','','','','','','','','','','grass_top','planted_soil_left'], // 14
	['','','','','','','','','','','','','ballmonster','grass_top','planted_soil_right'], // 15
	['','','','','','','','','','','','','','grass_top','soil'], // 16
	['','','','','','','','','','','','','','grass_top','soil'], // 17
	['','','','','','','','','','','','','','grass_top','soil'], // 18
	['','','','','','','','','','','','','','grass_top','soil'], // 19
	['','','','','','','','','','','pipeplant','pipe_top_left','pipe_left','pipe_left_grass','pipe_left_soil'], // 20
	['','','','','','','','','','','','pipe_top_right','pipe_right_grass','pipe_right_soil','pipe_right_soil'], // 21
	['','','','','','','','','','','','','grass_top','soil','soil'], // 22
	['','','','','','','','','','','','','grass_top','soil','soil'], // 23
	['','','','','','','','','','','','','grass_top','soil','soil'], // 24
	['','','','','','','','','','','','','grass_top','soil','soil'], // 25
	['','','','','','','','','','','','','grass_top','soil','soil'], // 26
	['','','','','','','','','','brown_block','brown_block','brown_block','grass_top','soil','soil'], // 27
	['','','','','','multiple_coinbox','','','','brown_block','brown_block','brown_block','grass_top','soil','soil'], // 28
	['','','','','','','','','','brown_block','brown_block','brown_block','grass_top','planted_soil_left','soil'], // 29
	['','','','','','','','','','','','','grass_top','planted_soil_middle','soil'], // 30
	['','','','','','','','','','','','ballmonster','grass_top','planted_soil_middle','soil'], // 31
	['','','','','','','','','','','','','grass_top','planted_soil_right','soil'], // 32
	['','','','','','','','','questionbox','','','','grass_top','soil','soil'], // 33: Q6 (thay coinbox)
	['','','','','','','','','','','','','grass_top','soil','soil'], // 34
	['','','','','','','','','','','','','grass_top','soil','soil'], // 35
	['','','','','','','','','','','','','grass_top','soil','soil'], // 36
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
	['','','','','','','','','questionbox','','','bush_right','grass_top','soil','soil'], // 59: Q7 (thay mushroombox)
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
	['','','','','','','','','starbox','','','bush_left','grass_top','soil','soil'], // 70
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
	['','','','','','','','','questionbox','','','greenturtle','grass_top','soil','planted_soil_right'], // 81: Q8 (thay coinbox)
	['','','','','','','','','','','','','grass_top','soil','soil'], // 82
	['','','','','','','','','','','','spikedturtle','grass_top','soil','soil'], // 83
	// ... (Rest of Level 1 data - giữ nguyên) ...
	['','','','','','','','','','','','','','grass_top','planted_soil_middle'] // Col 219 (last column)
	]
}
	,
{ // Level 2 (ID=2) - Sẽ nhận Câu 9, 10, 11, 12
	width: 220,
	height: 15,
	id: 2,
	background: 1,
	data:
	[
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 0
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'mario' , 'grass_top'], // 1
	// ... (Level 2 data) ...
	['' , '' , '' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 85
	['' , 'brown_block' , 'coin' , 'brown_block' , '' , 'multiple_coinbox' , '' , 'coinbox' , '' , '' , 'questionbox' , '' , 'grass_top' , 'soil' , 'soil'], // 86: Q9 (thay mushroombox)
	['' , '' , '' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'brown_block' , 'coin' , 'coin' , 'brown_block' , 'coin' , 'grass_top' , 'soil' , 'soil'], // 87
	// ... (Level 2 data) ...
	['' , '' , '' , 'coinbox' , '' , '' , '' , 'coinbox' , '' , '' , '' , 'pipeplant' , 'pipe_top_left' , 'grass_top' , 'soil'], // 100
	['' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , '' , '' , 'pipe_top_right' , 'grass_top' , 'soil'], // 101
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_top_left_corner' , 'soil'], // 102
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_right' , 'grass_right'], // 103
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 104
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 105
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 106
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_left' , 'grass_left'], // 107
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 108
	['' , '' , '' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil' , 'soil'], // 109
	['' , '' , '' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil' , 'soil'], // 110
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 111
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_right' , 'grass_top_right_corner'], // 112
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 113
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 114
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 115
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 116
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top'], // 117
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 118
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 119
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 120
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 121
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 122
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'grass_top'], // 123
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 124
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 125
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 126
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top'], // 127
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 128
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 129
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 130
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'grass_top'], // 131
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top'], // 132
	['' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_left' , 'grass_top_left_corner'], // 133
	['' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 134
	['' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 135
	['' , '' , 'starbox' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_left' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 136
	['' , '' , '' , '' , '' , 'bush_left' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_middle' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 137
	['' , '' , '' , '' , '' , 'bush_middle_left' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_middle' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 138
	['' , 'coin' , 'coin' , '' , '' , 'bush_middle' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_right' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 139
	['' , 'coin' , 'coin' , '' , '' , 'bush_middle_right' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 140
	['' , 'coin' , 'coin' , '' , '' , 'bush_middle' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'planted_soil_left' , 'soil'], // 141
	['' , 'coin' , 'coin' , '' , '' , 'bush_right' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'planted_soil_middle' , 'soil'], // 142
	['' , 'coin' , 'coin' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'planted_soil_right' , 'soil'], // 143
	['' , 'coin' , 'coin' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 144
	['' , 'coin' , 'coin' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 145
	['' , 'coin' , 'coin' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 146
	['' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right' , 'grass_right'], // 147
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 148
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''], // 149
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left'], // 150
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 151
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top'], // 152
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 153
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 154
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_top_left_corner'], // 155
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 156
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 157
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top' , 'soil'], // 158
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 159
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 160
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 161
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_top_right_corner'], // 162
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 163
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 164
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 165
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 166
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top'], // 167
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 168
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left' , 'grass_top_left_corner'], // 169
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 170
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top' , 'soil'], // 171
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_left' , 'grass_top' , 'soil'], // 172
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle_left' , 'grass_top' , 'soil'], // 173
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle' , 'grass_top' , 'soil'], // 174
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_right' , 'grass_top' , 'soil'], // 175
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'spikedturtle' , 'grass_top' , 'soil'], // 176
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 177
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 178
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right' , 'grass_top_right_corner'], // 179
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 180
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 181
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 182
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , 'grass_top'], // 183
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , 'grass_top'], // 184
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipeplant' , 'pipe_top_left' , 'pipe_left' , 'pipe_left' , 'pipe_left_grass'], // 185
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right' , 'pipe_right_grass'], // 186
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , 'grass_top'], // 187
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'coinbox' , '' , '' , 'grass_top'], // 188
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 189
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 190
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 191
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 192
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 193
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'grass_top'], // 194
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'grass_top'], // 195
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 196
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 197
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 198
	['' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , 'grass_top'], // 199
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 200
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 201
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 202
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'greenturtle' , 'grass_top'], // 203
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 204
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 205
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'greenturtle' , 'grass_top'], // 206
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 207
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 208
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 209
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'bush_left' , 'grass_top'], // 210
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'bush_middle_left' , 'grass_top'], // 211
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'bush_middle' , 'grass_top'], // 212
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , 'bush_right' , 'grass_top'], // 213
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 214
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 215
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_right'], // 216
	['' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , ''], // 217
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , ''], // 218
	['' , '' , 'coin' , 'coin' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top_left'], // 219
	// ... (Rest of Level 2 data - giữ nguyên) ...
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'] // Col 219 (last column)
	]
}
	,
// --- CÁC MÀN CHƠI CÒN LẠI (ID 3 ĐẾN 14) GIỮ NGUYÊN ---
// ... (Dán toàn bộ data cho Level 3 (id:3) đến Level 14 (id:14) vào đây) ...
// ...
{ // Level 3 (ID=3) - Sẽ nhận Câu 10, 11, 12
	width: 194,
	height: 15,
	id: 3,
	background: 8, // Nền hang động
	data:
	[
	['','','','','','','','','','','','','','grass_top','soil'], // Col 0
	['','','','','','','','','','','','pipe_top_left','pipe_left','pipe_left_grass','pipe_left_soil'], // Col 1
	['','','','','','','','','','','','pipe_top_right','pipe_right','pipe_right_grass','pipe_right_soil'], // Col 2
	['','','','','','','','','','','','','','grass_top','soil'], // Col 3
	['','','','','','','','','','','','','','grass_top','soil'], // Col 4
	['','','','','','','','','','','','','mario','grass_top','soil'], // Col 5 - Mario Start
	['','','','','','','','','','','','','','grass_top','soil'], // Col 6
	['','','','','','','','','','','','','','grass_top','soil'], // Col 7
	['','','','','','','','','questionbox','','','','','grass_top','soil'], // Col 8: Q10 (thay coinbox)
	['','','','','','','','','brown_block','','','','','grass_top','soil'], // Col 9
	['','','','','','','','','questionbox','','','','','grass_top','soil'], // Col 10: Q11 (thay mushroombox)
	['','','','','','','','spikedturtle','brown_block','','','','','grass_top','soil'], // Col 11
	['','','','','','','','','coinbox','','','','','grass_top','soil'], // Col 12
	['','','','','','','','','','','','','','grass_top','soil'], // Col 13
	['','','','','','','','','','','','','','grass_top','soil'], // Col 14
	['','','','','','','stone','','','','','','','grass_top','soil'], // Col 15
	['','','multiple_coinbox','','','','stone','','','','','','','grass_top_right_rounded','soil_right'], // Col 16
	['','','','','','','stone','','','','','','','',''], // Col 17
	['','','','','','','','','','','','','','',''], // Col 18
	['','','','','','','','','','','','','grass_top_left_rounded','soil_left','soil_left'], // Col 19
	['','','','','','','','','','','','','grass_top','soil','soil'], // Col 20
	['','','','','','','','','','','','','grass_top','soil','soil'], // Col 21
	['','','','','','','','','','','','','grass_top','soil','soil'], // Col 22
	['','','','','','','','','','','','','grass_top','soil','soil'], // Col 23
	['','','','','','','','','','','','greenturtle','grass_top','soil','grass_top_left_rounded_soil'], // Col 24
	['','','','','','','','','','','','','grass_top','planted_soil_left','grass_top'], // Col 25
	['','','','','','','','','','','','questionbox','grass_top','planted_soil_right','grass_top'], // Col 26: Q12 (thay mushroombox)
	['','','','','','','','','','','','stone','grass_top','soil','grass_top'], // Col 27
	// ... (Dữ liệu gốc màn 3) ...
	['','','','','','','','','','','','grass_top','soil','soil','soil'] // Col 193 (last column)
	]
}
,
{ // Level 4 (ID=4) - Giữ nguyên
	width: 203,
	height: 15,
	id: 4,
	background: 8,
	data:
	[
	// ... (Dữ liệu gốc màn 4) ...
	['','','','','','','','','','','','grass_top','soil','soil','soil']
	]
}
,
{ // Level 5 (ID=5) - Giữ nguyên
	width: 140,
	height: 15,
	id: 5,
	background: 3,
	data:
	[
	// ... (Dữ liệu gốc màn 5) ...
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil']
	]
}
,
{ // Level 6 (ID=6) - Giữ nguyên
	width: 165,
	height: 15,
	id: 6,
	background: 3,
	data:
	[
	// ... (Dữ liệu gốc màn 6) ...
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil']
	]
}
,
{ // Level 7 (ID=7) - Giữ nguyên
	width: 177,
	height: 15,
	id: 7,
	background: 5,
	data:
	[
	// ... (Dữ liệu gốc màn 7) ...
	['','','','','','','','','','','','grass_top','soil','soil','soil']
	]
}
,
{ // Level 8 (ID=8) - Giữ nguyên
	width: 181,
	height: 15,
	id: 8,
	background: 5,
	data:
	[
	// ... (Dữ liệu gốc màn 8) ...
	['','','','','','','','','','','','','','','grass_top_right_rounded']
	]
}
,
{ // Level 9 (ID=9) - Giữ nguyên
	width: 242,
	height: 15,
	id: 9,
	background: 6,
	data:
	[
	// ... (Dữ liệu gốc màn 9) ...
	['','','','','','','','','','','','','','','']
	]
}
,
{ // Level 10 (ID=10) - Giữ nguyên
	width: 161,
	height: 15,
	id: 10,
	background: 6,
	data:
	[
	// ... (Dữ liệu gốc màn 10) ...
	['','','','','','','','','','','','','','','']
	]
}
,
{ // Level 11 (ID=11) - Giữ nguyên
	width: 106,
	height: 15,
	id: 11,
	background: 2,
	data:
	[
	// ... (Dữ liệu gốc màn 11) ...
	['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '']
	]
}
,
{ // Level 12 (ID=12) - Giữ nguyên
	width: 233,
	height: 15,
	id: 12,
	background: 2,
	data:
	[
	// ... (Dữ liệu gốc màn 12) ...
	['','','','','','','','','','','','','','','']
	]
}
,
{ // Level 13 (ID=13) - Giữ nguyên
	width: 162,
	height: 15,
	id: 13,
	background: 2,
	data:
	[
	// ... (Dữ liệu gốc màn 13) ...
	['','','','','','','','','','','','','','','']
	]
}
,
{ // Level 14 (ID=14) - Giữ nguyên
	width: 155,
	height: 15,
	id: 14,
	background: 4,
	data:
	[
	// ... (Dữ liệu gốc màn 14) ...
	['' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '']
	]
}
];


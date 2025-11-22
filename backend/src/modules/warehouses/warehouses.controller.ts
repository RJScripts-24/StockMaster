#warehouse controller
import { Request, Response } from 'express';
 import { validate } from '../../shared/utils/validators';
import {
	createWarehouseSchema,
	createLocationSchema,
	CreateWarehouseDto,
	CreateLocationDto
} from './dto/warehouse.dto';
import * as service from './warehouses.service';

export async function listWarehousesHandler(_req: Request, res: Response) {
	const warehouses = await service.listWarehouses();
	res.json(warehouses);
}

export async function getWarehouseHandler(req: Request, res: Response) {
	const warehouse = await service.getWarehouse(req.params.id);
	res.json(warehouse);
}

export async function createWarehouseHandler(req: Request, res: Response) {
	const payload = validate<CreateWarehouseDto>(createWarehouseSchema, req.body);
	const warehouse = await service.createWarehouse(payload);
	res.status(201).json(warehouse);
}

export async function createLocationHandler(req: Request, res: Response) {
	const payload = validate<CreateLocationDto>(createLocationSchema, req.body);
	const location = await service.createLocation(req.params.id, payload);
	res.status(201).json(location);
}

export async function listLocationsHandler(req: Request, res: Response) {
	const locations = await service.listLocations(req.params.id);
	res.json(locations);
}

export async function getLocationStockHandler(req: Request, res: Response) {
	const stock = await service.getLocationStock(req.params.id);
	res.json(stock);
}

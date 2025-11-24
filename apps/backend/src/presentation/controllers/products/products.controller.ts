import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { SearchProductsUseCase } from '../../../domain/use-cases/search-products/search-products.usecase';
import { GetProductDetailUseCase } from '../../../domain/use-cases/get-product-detail/get-product-detail.usecase';
import { GetSuggestionsUseCase } from '../../../domain/use-cases/get-suggestions/get-suggestions.usecase';
import { SearchQueryDto } from './dto/search-query.dto';
import { SuggestionsQueryDto } from './dto/suggestions-query.dto';
import { ProductIdParamDto } from './dto/product-id-param.dto';
import { SearchResultResponseDto } from '../../dto/responses/search-result.response.dto';
import { ProductListItemResponseDto } from '../../dto/responses/product-list-item.response.dto';
import { ErrorResponseDto } from '../../dto/responses/error.response.dto';

/**
 * Products Controller
 * Handles product-related HTTP requests
 */
@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(
    private readonly searchProductsUseCase: SearchProductsUseCase,
    private readonly getProductDetailUseCase: GetProductDetailUseCase,
    private readonly getSuggestionsUseCase: GetSuggestionsUseCase,
  ) {}

  /**
   * Get product suggestions
   * GET /api/v1/products/suggestions?q=iph&limit=6
   */
  @Get('suggestions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get product suggestions',
    description: 'Get autocomplete suggestions for products',
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query term (minimum 2 characters)',
    example: 'iph',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Maximum number of suggestions',
    required: false,
    example: 6,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product suggestions',
    type: [ProductListItemResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query (too short)',
    type: ErrorResponseDto,
  })
  async getSuggestions(
    @Query() query: SuggestionsQueryDto,
  ): Promise<ProductListItemResponseDto[]> {
    this.logger.log(`Getting suggestions for query: ${query.q}`);

    const products = await this.getSuggestionsUseCase.execute({
      query: query.q,
      limit: query.limit || 6,
    });

    // Map domain entities to response DTOs
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      currencyId: product.currencyId,
      condition: product.condition,
      thumbnail: product.thumbnail,
      shipping: product.shipping,
      installments: product.installments,
      reviews: product.reviews,
    })) as ProductListItemResponseDto[];
  }

  /**
   * Search products
   * GET /api/v1/products/search?q=iphone&limit=10&offset=0
   */
  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search products',
    description: 'Search products by query with pagination',
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query term',
    example: 'iphone',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Results per page',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    description: 'Pagination offset',
    required: false,
    example: 0,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Search results',
    type: SearchResultResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid search query',
    type: ErrorResponseDto,
  })
  async search(
    @Query() query: SearchQueryDto,
  ): Promise<SearchResultResponseDto> {
    this.logger.log(`Searching products with query: ${query.q}`);

    const searchResult = await this.searchProductsUseCase.execute({
      query: query.q,
      limit: query.limit,
      offset: query.offset,
    });

    // Map domain entities to response DTOs
    const response: SearchResultResponseDto = {
      query: searchResult.query,
      results: searchResult.products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        currencyId: product.currencyId,
        condition: product.condition,
        thumbnail: product.thumbnail,
        shipping: product.shipping,
        installments: product.installments,
        reviews: product.reviews,
      })) as ProductListItemResponseDto[],
      paging: {
        total: searchResult.paging.total,
        offset: searchResult.paging.offset,
        limit: searchResult.paging.limit,
      },
    };

    return response;
  }

  /**
   * Get product detail
   * GET /api/v1/products/:id
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get product detail',
    description: 'Get detailed information about a specific product',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 'MLA123456789',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product detail',
    type: ProductListItemResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid product ID format',
    type: ErrorResponseDto,
  })
  async getDetail(
    @Param() params: ProductIdParamDto,
  ): Promise<ProductListItemResponseDto> {
    this.logger.log(`Getting product detail for ID: ${params.id}`);

    const product = await this.getProductDetailUseCase.execute({
      id: params.id,
    });

    // Map domain entity to response DTO
    const response: ProductListItemResponseDto = {
      id: product.id,
      title: product.title,
      price: product.price,
      currencyId: product.currencyId,
      condition: product.condition,
      thumbnail: product.thumbnail,
      shipping: product.shipping,
      installments: product.installments,
      reviews: product.reviews,
    };

    return response;
  }
}
